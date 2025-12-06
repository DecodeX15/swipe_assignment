import { useState } from "react";
import InvoiceTab from "../Components/InvoiceTab.jsx";
import ProductsTab from "../Components/ProdcutsTab.jsx";
import CustomersTab from "../Components/CustomerTab.jsx";
import UploadBox from "../Components/FileUploader.jsx";

const Analyse = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="w-full min-h-screen p-6">
      <UploadBox />
      {/* Top Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("invoices")}
              className={`px-4 py-2 rounded-lg border cursor-pointer ${
                activeTab === "invoices"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-white dark:text-white"
              }`}
        >
          Invoices
        </button>

        <button
          onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg border cursor-pointer ${
                activeTab === "products"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-white dark:text-white"
              }`}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab("customers")}
              className={`px-4 py-2 rounded-lg border cursor-pointer ${
                activeTab === "customers"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-white dark:text-white"
              }`}
        >
          Customers
        </button>
      </div>

      {/* Render Based on Active Tab */}
      <div>
        {activeTab === "invoices" && <InvoiceTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "customers" && <CustomersTab />}
      </div>
    </div>
  );
};

export default Analyse;
