import express from 'express';
import { createFile, deleteFile,  getFileById,  getFiles, updateFile } from '../dataAccess/EditDA';

let editRouter = express.Router();

editRouter.route('/edit').post(async (req, res) => {
    return res.json(await createFile(req.body));
});

editRouter.route('/edit/:id').get( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await getFileById(id));
});


editRouter.route('/user').get( async (req, res) => {
    return res.json(await getFiles());
});

editRouter.route('/edit/:id').delete( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await deleteFile(id));
});

editRouter.route('/edit/:id').put( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await updateFile(req.body, id));
  })

export default editRouter;