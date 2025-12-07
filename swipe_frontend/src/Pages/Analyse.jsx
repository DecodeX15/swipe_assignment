import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// Components
import InvoiceTab from "../Components/InvoiceTab.jsx";
import ProductsTab from "../Components/ProdcutsTab.jsx";
import CustomersTab from "../Components/CustomerTab.jsx";
import UploadBox from "../Components/FileUploader.jsx";

const Analyse = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const invoices = useSelector((state) => state.invoices);
  if (invoices) console.log(invoices);
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };
  const tabComponents = {
    invoices: InvoiceTab,
    products: ProductsTab,
    customers: CustomersTab,
  };
  const ActiveComponent = tabComponents[activeTab];
  const TabButton = ({ name, tabKey }) => {
    const isActive = activeTab === tabKey;
    return (
      <motion.button
        onClick={() => setActiveTab(tabKey)}
        whileTap={{ scale: 0.95 }}
        whileHover={{
          y: -2,
          boxShadow: isActive
            ? "0 0 15px rgba(59, 130, 246, 0.8)"
            : "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
        className={`px-6 py-3 font-semibold text-lg tracking-wide rounded-xl border-2 transition-all duration-300 ease-in-out cursor-pointer ${
          isActive
            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/50"
            : "bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:border-blue-500"
        }`}
      >
        {name}
      </motion.button>
    );
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-900 text-white">
      <UploadBox />

      <hr className="border-gray-700 my-8" />

      <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-400">
        📊 Analysis Results
      </h2>

      <div className="flex justify-center gap-6 mb-8">
        <TabButton name="🧾 Invoices" tabKey="invoices" />
        <TabButton name="📦 Products" tabKey="products" />
        <TabButton name="👤 Customers" tabKey="customers" />
      </div>

      <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analyse;
