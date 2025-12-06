import { useState } from "react";

const UploadBox = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-lg font-semibold text-black dark:text-white mb-2">
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
          <p className="text-black dark:text-white font-medium mb-1">
            Selected Files:
          </p>
          <ul className="list-disc ml-6 text-black dark:text-gray-300 text-sm">
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
