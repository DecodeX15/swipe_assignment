import { GoogleGenAI } from "@google/genai";
import XLSX from "xlsx";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const fileshandler_controller = async (req, res) => {
  try {
    const files = req.files;
    console.log(files);
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
    const prompt = {
      text: `
You are an advanced invoice, product, and customer data extraction engine.

Your job:
1. Read ALL uploaded files (PDF, images, Excel/CSV).
2. Detect if ANY of the files contains INVOICE or BILLING information.
3. If NONE of the files contain invoice-related data (e.g., CV, resume, random document), return EXACTLY:
   { "error": "No invoice data found" }

If invoice-related information exists, extract data into the following STRICT JSON structure.
Return ONLY valid JSON. No explanations. No additional text.

{
  "invoices": [
    {
      "serialNumber": "",
      "invoiceDate": "",
      "customerName": "",
      "customerPhone": "",
      "customerCompanyName": "",
      "productName": "",
      "qty": "",
      "unit": "",
      "unitPrice": "",
      "discount": "",
      "taxableValue": "",
      "taxRate": "",
      "taxAmount": "",
      "totalAmount": "",
      "amountBeforeTax": "",
      "amountAfterTax": "",
      "paymentMethod": "",
      "amountpending":"",
      "status": ""
    }
  ],

  "products": [
    {
      "name": "",
      "quantity": "",
      "unitPrice": "",
      "unit": "",
      "itemDiscount": "",
      "priceWithTax": "",
      "taxRate": "",
      "taxAmount": "",
      "taxableValue": "",
      "discountrate": "",
    }
  ],

  "customers": [
    {
      "customerName": "",
      "phoneNumber": "",
      "companyName": "",
      "gstin": "",
      "totalPurchaseAmount": "",
    }
  ]
}

Important rules:
- Extract ALL values only from the uploaded files.
- NEVER hallucinate values.
- If a value does NOT exist in the document, return null.
- Dates must be in human-readable format if visible.
- Amounts must be numbers when possible.
- Merge invoices from all files into a single list.
- Merge products from all files into a single list.
- Merge customers (deduplicate by customerName if possible) from all files into a single list.
- Output MUST be valid JSON only.

Now extract the data.
`,
    };

    const contents = [prompt, ...fileParts];

    // ai integration 
    console.log("loading.......");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });
    console.log(response);
    const responseText =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("GEMINI RAW:", responseText);
    let extracted;
    try {
      extracted = JSON.parse(responseText);
    } catch (err) {
      return res.status(200).json({
        error: "Unable to parse invoice data",
        rawResponse: responseText,
      });
    }

    return res.status(200).json({
      message: "Extraction successful",
      data: extracted,
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({ error: error.message });
  }
};
