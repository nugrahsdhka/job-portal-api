import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    
    res.status(201).json({
      message: "Register berhasil!",
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);
    
    res.status(200).json({
      message: "Login berhasil!",
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      error: error.message
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  res.json({
    message: "Ini adalah data profil Anda",
    user_id_from_token: userId,
    role_from_token: req.user?.role
  });
};