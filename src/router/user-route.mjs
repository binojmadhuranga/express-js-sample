import { Router } from "express";       

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send('User Home Page');
});

userRouter.post('/create', (req, res) => {
  const userData = req.body; // Assuming body-parser middleware is used
  res.status(201).json({ message: 'User created successfully', data: userData });
});

export default userRouter;
