import express from 'express';
import { createUser, deleteUser, getUserByEmail, getUserById, getUserForLogin, getUsers, updateUser } from '../dataAccess/userDA';

let userRouter = express.Router();

userRouter.route('/user').post(async (req, res) => {
    return res.json(await createUser(req.body));
});

userRouter.route('/user/:id').get( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await getUserById(id));
});

userRouter.route('/user/:email').post(async (req, res) => {
    console.log('a ajuns aici')
    const email = req.params.email;
    console.log(`params = ${email}`);
    return res.json(await getUserByEmail(email));
});  

userRouter.route('/user/:email/:password').post(async (req, res) => {
    console.log('a ajuns aici')
    const email = req.params.email;
    const password = req.params.password;
    console.log(`params = ${email}`);
    return res.json(await getUserForLogin(email, password));
});  

userRouter.route('/user').get( async (req, res) => {
    return res.json(await getUsers());
});

userRouter.route('/user/:id').delete( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await deleteUser(id));
});

userRouter.route('/user/:id').put( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await updateUser(req.body, id));
  })

export default userRouter;