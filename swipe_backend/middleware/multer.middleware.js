import multer from "multer";
const storage = multer.memoryStorage();
console.log("muklter chal gaya")
export const upload = multer({ storage: storage });
