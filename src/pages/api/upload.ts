// import type { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { nextConnect } from 'next-connect';

// // Set up storage engine for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = './public/uploads';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Create the multer instance
// const upload = multer({ storage });

// // Create the next-connect handler
// const handler = nextConnect<NextApiRequest, NextApiResponse>();

// // Use multer as middleware
// handler.use(upload.single('logo')); // 'logo' is the name of the input field for the file

// // API route handler
// handler.post((req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded.' });
//   }

//   // Path to the file in the 'public/uploads' folder
//   const filePath = `/uploads/${req.file.filename}`;

//   res.status(200).json({ message: 'File uploaded successfully', path: filePath });
// });

// // Export the handler as the default export
// export default handler;
