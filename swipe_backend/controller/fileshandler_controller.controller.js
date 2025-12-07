import { GoogleGenAI } from "@google/genai";
import XLSX from "xlsx";
console.log(process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const cleanGeminiJSON = (raw) => {
  if (!raw) return raw;
  raw = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  raw = raw.replace(/,\s*([}\]])/g, "$1");
  raw = raw.replace(/[\u0000-\u001F]+/g, "");
  return raw;
};

const check_products = (data) => {
  const dummy_prod = {
    name: null,
    quantity: null,
    unitPrice: null,
    unit: null,
    discount: null,
    taxableValue: null,
    taxRate: null,
    discountrate: null,
    taxAmount: null,
    priceWithTax: null,
  };

  return {
    ...data,
    invoices: data.invoices.map((inv) => {
      if (!inv.products || inv.products.length === 0) {
        return { ...inv, products: [dummy_prod] };
      }
      return inv;
    }),
  };
};

export const fileshandler_controller = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const fileParts = [];

    // converting xlxs to csv and all files to base64
    for (const file of files) {
      // 🔵 If Excel: Convert to CSV
      if (
        file.mimetype.includes("spreadsheetml") ||
        file.mimetype.includes("excel")
      ) {
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const csvText = XLSX.utils.sheet_to_csv(sheet);

        fileParts.push({
          inlineData: {
            mimeType: "text/plain",
            data: Buffer.from(csvText).toString("base64"),
          },
        });

        continue;
      }

      // 🔵 If PDF or Image → Send as base64
      fileParts.push({
        inlineData: {
          mimeType: file.mimetype,
          data: file.buffer.toString("base64"),
        },
      });
    }

    // Prompt for extraction
    const prompt = `
You are an extremely strict invoice extraction engine.

You will receive a mix of PDFs, Images, or Excel/CSV files.

=========================================
EXCEL/CSV RULES (VERY IMPORTANT)
=========================================
If the uploaded file is Excel or CSV:

- Read ALL rows.
- Treat EACH ROW as a possible invoice line or product line and each row independent .
- Don't merge any row with other rows.
- If a row contains product-related fields (name, qty, price), extract it.
- If a row contains invoice metadata (date, invoice number, customer name), extract it.
- If Excel contains multiple invoices, extract ALL.
- DO NOT ignore Excel rows unless the row is completely empty.
- DO NOT assume PDF-like structure for Excel.

=========================================
PDF / IMAGE RULES
=========================================
- Extract all visible invoice information.
- Extract ALL product lines.
- A product MUST have a name; else ignore the line.
- DO NOT hallucinate missing rows.
- Do not merge invoices of different files keep it separate.
=========================================
GLOBAL RULES
=========================================
1. If NO invoice-related information exists, return EXACTLY:
   { "error": "No invoice data found" }

2. Output ONLY this JSON structure:
3. Cross check that json structure is correct before responding.
4. Do not generate or infer any product rows on your own — only include product entries that are explicitly visible in the uploaded file.


{
  "invoices": [
    {
      "serialNumber": null,
      "invoiceDate": null,
      "customerName": null,
      "customerPhone": null,
      "customerCompanyName": null,
      "gstin": null,
      "totalAmount": null,
      "amountBeforeTax": null,
      "taxamount": null,
      "paymentMethod": null,
      "amountPending": null,
      "status": null,
      "Created By":"null",

      "products": [
        {
          "name": null,
          "quantity": null,
          "unitPrice": null,
          "unit": null,
          "discount": null,
          "taxableValue": null,
          "taxRate": null,
          "discountrate": null,
          "taxAmount": null,
          "priceWithTax": null
        }
      ]
    }
  ]
}

3. DO NOT create empty product objects.
4. DO NOT repeat product rows unless they appear in the document.
5. DO NOT hallucinate invoice numbers, totals, dates, etc.
6. If unsure, return null.
7. Return ONLY valid JSON. No extra text.
8. If the file or text clearly looks like an invoice or bill, extract structured invoice data; otherwise return only: Please upload a valid invoice.

Now extract the data.
`;

    const contents = [prompt, ...fileParts];

    // ai integration
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });
    const responseText =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let cleaned = cleanGeminiJSON(responseText);
    let extracted;
    try {
      extracted = JSON.parse(cleaned);
    } catch (err) {
      return res.status(500).json({
        error: "Unable to parse invoice data, Please upload a valid invoice",
        rawResponse: cleaned,
      });
    }
    // const dummyInvoices = {
    //   message: "Dummy invoices loaded",
    //   invoices: [
    //     {
    //       serialNumber: "INV001",
    //       invoiceDate: "2025-01-10",
    //       customerName: "Rahul Sharma",
    //       customerPhone: "9876543210",
    //       customerCompanyName: "Sharma Traders",
    //       gstin: "27AAACX1234A1Z5",
    //       totalAmount: 1180,
    //       amountBeforeTax: 1000,
    //       taxamount: 180,
    //       paymentMethod: "UPI",
    //       amountPending: 0,
    //       status: "PAID",
    //       createdBy: "SYSTEM",
    //       products: [],
    //     },

    //     {
    //       serialNumber: "INV002",
    //       invoiceDate: "2025-01-12",
    //       customerName: "Priya Verma",
    //       customerPhone: "9123456780",
    //       customerCompanyName: "Verma Enterprises",
    //       gstin: "07AAACX5678B1Z2",
    //       totalAmount: 2360,
    //       amountBeforeTax: 2000,
    //       taxamount: 360,
    //       paymentMethod: "CASH",
    //       amountPending: 200,
    //       status: "PARTIAL",

    //       products: [],
    //     },
    //   ],
    // };
    // console.log("donnnnnn");
    // function sleep(ms) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    // await sleep(5000);
    const result = check_products(extracted);
    console.log(result);
    return res.status(200).json({
      message: "Extraction successful",
      data: result,
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({ error: error.message });
  }
};
