import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      res.status(400).json({ message: 'كل الحقول مطلوبة' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'صيغة البريد الإلكتروني غير صحيحة' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'هذا البريد الإلكتروني مسجل بالفعل!' });
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
      message: 'تم تسجيل الحساب بنجاح!',
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في السيرفر أثناء التسجيل', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {

        res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } 
    );

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح!',
      token,
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في السيرفر أثناء تسجيل الدخول', error });
  }
};
