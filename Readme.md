# Swipe Assignment

## Overview

This project is a full-stack application for uploading, analyzing, and extracting structured data from invoice and business documents using AI. It consists of a React frontend and a Node.js/Express backend with AI-powered data extraction.

---

## Features

- Upload multiple files (PDF, images, Excel)
- AI-powered extraction of invoice, product, and customer data
- Editable, color-coded invoice tables
- Real-time validation and auto-save
- Modern, responsive UI

---

## AI Data Extraction Feature

### How It Works

- When files are uploaded, the backend uses Google Gemini AI to analyze the content.
- The AI determines if the files contain invoice/business/billing information.
- If invoice data is found, the AI extracts structured fields such as:
  - Invoice serial number, customer name, product details, quantity, tax, total amount, date, etc.
  - Product and customer information
- If no invoice data is found, the AI returns an error message.
- The extracted data is returned as strict JSON and displayed in the frontend for review and editing.

### API Endpoint

- **POST** `/api/files/upload`
- Accepts: Multiple files (PDF, JPG, PNG, XLSX, XLS)
- Returns: Extracted data in JSON format or an error if no invoice data is found

### Example Response

```json
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
      "Created By": null,

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
```

### Error Example

```json
{
  "error": "No invoice data found"
}
```

---

## Workflow: AI Invoice Data Extraction

Below is a detailed step-by-step workflow of how the AI-powered invoice data extraction works in this project:

1. **User Uploads Files (Frontend)**

   - The user selects and uploads one or more files (PDF, image, Excel, etc.) using the web interface.
   - The frontend reads the files and prepares them for upload. Files are sent as binary data (multipart/form-data) to the backend using an HTTP POST request.

2. **File Reception & Buffering (Backend: Multer Middleware)**

   - The backend uses the Multer middleware to handle incoming file uploads.
   - Multer parses the multipart request, extracts the files, and stores them in memory as buffers (raw binary data).

3. **AI Data Extraction (Backend: Google Gemini AI)**

   - The buffered file data is passed to the Google Gemini AI model.
   - The backend constructs a prompt instructing the AI to:
     - Detect if the files contain invoice/business/billing data.
     - If found, extract structured fields (invoice, product, customer info) in strict JSON format.
     - If not found, return an error message.
   - The file buffers and prompt are sent to Gemini for processing.

4. **AI Response Handling (Backend)**

   - The Gemini AI model analyzes the file content and returns a JSON response with extracted data or an error.
   - The backend parses the AI response and forwards the structured data (or error) to the frontend.

5. **Display & Edit (Frontend)**
   - The frontend receives the extracted data and displays it in a table.
   - Fields that are missing or could not be extracted are highlighted (e.g., with a red border).
   - The user can review and edit the extracted data before saving or further processing.

---

**Summary Diagram:**

```
User Uploads Files (Frontend)
        ↓
Files sent as binary (multipart/form-data)
        ↓
Multer receives & buffers files (Backend)
        ↓
Buffers + prompt sent to Gemini AI
        ↓
Gemini AI extracts data → JSON response
        ↓
Backend parses & returns data
        ↓
Frontend displays, highlights, and allows editing
```

This workflow ensures a seamless, AI-powered extraction of structured invoice data from a variety of file formats, with user-friendly review and correction in the UI.

---

## Running the Project

### Backend

1. `cd swipe_backend`
2. `npm install`
3. Set up your `.env` with your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
4. `npm start`

### Frontend

1. `cd swipe_frontend`
2. `npm install`
3. `npm run dev`
4. Set up your `.env` with your VITE_BACKEND_ENDOINT key:
   ```env
   VITE_BACKEND_ENDOINT=your_key_here
   ```

---

## Technologies Used

- React, Redux, Tailwind CSS
- Node.js, Express, multer{middileware}
- Google Gemini AI (Generative AI)

---

## Notes

- All extracted data is editable in the frontend before saving.
- Fields missing from extraction are highlighted for user review.
- The AI does not hallucinate data; missing fields are set to null.

---

## License

MIT
