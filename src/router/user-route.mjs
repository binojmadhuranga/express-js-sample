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



userRouter.get('/get-user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: 'User ID is required',
        error: 'Missing user ID'
      });
    }


    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: 'No user found with the provided ID'
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      message: 'Error fetching user',
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


userRouter.put('/update-user', async (req, res) => {
  const { id, name, email } = req.body;

  try {
   
    if (!id || !name || !email) {
      return res.status(400).json({
        message: 'ID, name, and email are required',
        error: 'Missing required fields'
      });
    }  

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { name, email }
    });

    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
});


userRouter.delete('/delete-user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        message: 'User ID is required',
        error: 'Missing user ID'
      });
    }

    // Delete user from database
    await prisma.user.delete({
      where: { id: parseInt(id, 10) }
    });

    return res.status(200).json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
});

export default userRouter;