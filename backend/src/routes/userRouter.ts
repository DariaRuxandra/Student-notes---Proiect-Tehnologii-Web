import express from 'express';
import { createUser, deleteUser, getUserByEmail, getUserById, getUserForLogin, getUsers, updateUser, getUserCoursesById } from '../dataAccess/userDA';

let userRouter = express.Router();

userRouter.route('/user').post(async (req, res) => {
    return res.json(await createUser(req.body));
});

userRouter.route('/user/:id').get( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await getUserById(id));
});


userRouter.route('/user/:id/courses').get(async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const courses = await getUserCoursesById(id);
      console.log('courses:', courses);
      if (!courses) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json({ courses });
    } catch (error) {
      console.error('Error fetching user courses:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
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