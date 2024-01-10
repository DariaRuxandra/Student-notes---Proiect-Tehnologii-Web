import express from 'express';
import { createFile, deleteFile,  getFileById,  getFiles, updateFile } from '../dataAccess/EditDA';

let viewFileRouter = express.Router();

viewFileRouter.route('/viewFile').post(async (req, res) => {
    return res.json(await createFile(req.body));
});

viewFileRouter.route('/viewFile/:id').get( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await getFileById(id));
});


viewFileRouter.route('/viewFile').get( async (req, res) => {
    return res.json(await getFiles());
});

viewFileRouter.route('/viewFile/:id').delete( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await deleteFile(id));
});

viewFileRouter.route('/viewFile/:id').put( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await updateFile(req.body, id));
  })

export default viewFileRouter;