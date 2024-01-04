import express from 'express';
import multer from 'multer';
import path from 'path';
import { upload } from '../dataAccess/EditDA';

const editingRouter = express.Router();

editingRouter.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = '/uploads/' + (req.file as Express.Multer.File).filename;
  res.json({ imageUrl });
});

export default editingRouter;