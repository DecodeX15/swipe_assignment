import multer from "multer";
const storage = multer.memoryStorage();
console.log("multer chal gaya")
export const upload = multer({ storage: storage });
