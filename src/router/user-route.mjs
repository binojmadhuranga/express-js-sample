import { Router } from "express";       
import { userInfo } from "../data/user-info.mjs";   

const userRouter = Router();

userRouter.get('/get', (req, res) => {
  res.json(userInfo);
});

// userRouter.post('/create', (req, res) => {
//   const userData = req.body; // Assuming body-parser middleware is used
//   res.status(201).json({ message: 'User created successfully', data: userData });
// });

userRouter.post('/create-user', async(req, res) => {
  const userData = req.body; 
  res.status(201).json({ message: 'User created successfully', data: userData });
});




export default userRouter;
