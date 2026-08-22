import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Incorrect email format' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'The password must be at least 8 characters long.' });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'This email is already registered!' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'Account registration successful!',
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred on the server during registration', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {

        res.status(400).json({ message: 'Incorrect email address or password!' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Incorrect email address or password!' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } 
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'A server error occurred during login', error });
  }
};
