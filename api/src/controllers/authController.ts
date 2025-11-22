import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../utils/mockDatabase';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';
import { AuthResponse, RegisterRequest, LoginRequest } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password }: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      });
      return;
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = createUser({
      username,
      email,
      password_hash: passwordHash,
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    const response: AuthResponse = {
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Login request body:', req.body);
    const { email, password }: LoginRequest = req.body;

    console.log('Login attempt:', { email, password: password ? '***' : 'missing' });

    // Find user
    const user = findUserByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // Check password
    console.log('Checking password...');
    const isPasswordValid = await comparePassword(password, user.password_hash);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const user = findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Remove password hash from response
    const { password_hash, ...userData } = user;

    res.json({
      success: true,
      data: {
        ...userData,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { username, email } = req.body;

    const user = findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Update user
    if (username) user.username = username;
    if (email) user.email = email;
    user.updatedAt = new Date();

    // Remove password hash from response
    const { password_hash, ...userData } = user;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        ...userData,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};