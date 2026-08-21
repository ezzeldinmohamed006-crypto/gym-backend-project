import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: 'Member' | 'Trainer';
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: 'Authentication required'
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        message: 'Token is missing'
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string    ) as {
      userId: string;
      role: 'Member' | 'Trainer';
    };

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};