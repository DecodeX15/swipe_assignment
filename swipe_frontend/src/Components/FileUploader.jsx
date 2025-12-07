import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setInvoices } from "../features/invoicesSlice";

const UploadBox = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();
  const handleFileChange = async (e) => {
    try {
      const files = Array.from(e.target.files);

      if (!files || files.length === 0) {
        alert("No files selected");
        return;
      }
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file); // SAME KEY multiple times
      });
      console.log("loadingggggg");
      const res = await axios.post(
        "http://localhost:5000/api/files_analysis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", res.data);
      alert(res.data.message || "Files uploaded successfully");
      dispatch(setInvoices(res?.data?.data?.invoices || []));
      setSelectedFiles(files);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-lg font-semibold text-white dark:text-white mb-2">
        Upload Files
      </label>

      <input
        type="file"
        multiple
        accept=".pdf, .jpg, .jpeg, .png, .xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 
                   file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                   file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />
      {/* Show Selected File Names */}
      {selectedFiles.length > 0 && (
        <div className="mt-3">
          <p className="text-white dark:text-white font-medium mb-1">
            Selected Files:
          </p>
          <ul className="list-disc ml-6 text-white dark:text-gray-300 text-sm">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
