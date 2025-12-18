import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setInvoices } from "../features/invoicesSlice";
import { motion } from "framer-motion"; // Import framer-motio
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const UploadBox = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
  ];
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    setLoading(true);

    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setLoading(false);
      toast.error("Invalid file selected!");
      e.target.value = null;
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDOINT}/api/files_analysis`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      dispatch(setInvoices(res?.data?.data?.invoices || []));
      setSelectedFiles(files);
      toast.success("Files uploaded and analyzed successfully!");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "An error occurred during file upload."
      );
      setSelectedFiles([]);
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="w-full mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 border-4 border-teal-500 border-t-transparent rounded-full"
            ></motion.div>
            <p className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
              Analyzing Documents...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait, this may take a moment.
            </p>
          </motion.div>
        </div>
      )}
      <label className="block text-lg font-bold text-white mb-2">
        Upload Documents for Analysis
      </label>
      <motion.div
        className="relative border-2 border-dashed border-gray-500 dark:border-gray-600 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-colors duration-300"
        whileTap={{ scale: 0.98 }}
        whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
      >
        <input
          type="file"
          multiple
          accept=".pdf, .jpg, .jpeg, .png, .xlsx, .xls"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className="w-8 h-8 text-blue-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.884 1.391C5.908 17.6 5 18 5 18H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v10c0 .35-.08.68-.23.97l-2.4-2.4a.8.8 0 00-1.13 0l-2.67 2.67a.8.8 0 000 1.13l-1.9 1.9a.8.8 0 00-1.13 0l-3.37-3.37a.8.8 0 00-1.13 0zM12 13a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </svg>
          <p className="text-white font-semibold">
            Drag & Drop or{" "}
            <span className="text-blue-400 underline">Browse Files</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            (PDF, Image, Excel - Max 5MB per file)
          </p>
        </div>
      </motion.div>

      {/* Animated Selected File List */}
      {selectedFiles.length > 0 && (
        <motion.div
          className="mt-4 p-4 bg-gray-800 dark:bg-gray-900 rounded-lg"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.05 }}
        >
          <p className="text-teal-400 font-bold mb-2 flex items-center">
            <span className="mr-2"></span> Files Ready for Upload:
          </p>
          <ul className="space-y-1">
            {selectedFiles.map((file, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center text-gray-300 text-sm"
                variants={fileItemVariants}
              >
                <span className="truncate flex-1">📄 {file.name}</span>
                <span className="ml-4 text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default UploadBox;
