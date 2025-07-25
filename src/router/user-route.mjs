import { Router } from "express";
import { userInfo } from "../data/user-info.mjs";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const userRouter = Router();

userRouter.get('/get-all', async (_, res) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});



userRouter.post('/create-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        message: 'Name and email are required',
        error: 'Missing required fields' 
      });
    }

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email
      }
    });
    
    return res.status(201).json({ 
      message: 'User created successfully', 
      data: newUser 
    });
    
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: 'Email already exists', 
        error: 'Duplicate email address' 
      });
    }
    
    return res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
});




// userRouter.put('/update-user', async (req, res) => {




export default userRouter;