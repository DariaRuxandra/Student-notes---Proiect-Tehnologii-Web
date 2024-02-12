import express from 'express';
import { createUserFile, deleteUserFile,  getUserFileById,  getUserFiles, updateUserFile } from '../dataAccess/userFileDA';

let userFileRouter = express.Router();

userFileRouter.route('/userFile').post(async (req, res) => {
    return res.json(await createUserFile(req.body));
});

userFileRouter.route('/userFile/:id').get( async (req, res) => {
    
    let id = parseInt(req.params.id) 
    return res.json(await getUserFileById(id));
});

userFileRouter.route('/userFile').get( async (req, res) => {
    return res.json(await getUserFiles());
});

userFileRouter.route('/userFile/:id').delete( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await deleteUserFile(id));
});

userFileRouter.route('/userFile/:id').put( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await updateUserFile(req.body, id));
  })

export default userFileRouter;