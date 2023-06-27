import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

// Secret keys for JWT
const jwtSecret = 'your-secret-key';
const refreshTokenSecret = 'your-refresh-secret-key';

// Register a new user
export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Create a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // Generate a JWT access token
    const accessToken = generateAccessToken(newUser.userId);
    // Generate a refresh token
    const refreshToken = generateRefreshToken(newUser.userId);

    // Return the access token and refresh token
    res.json({ newUser, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Unable to register user' });
  }
}

// Login with existing user
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT access token
    const accessToken = generateAccessToken(user.userId);
    // Generate a refresh token
    const refreshToken = generateRefreshToken(user.userId);

    // Return the access token and refresh token
    res.json({user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Unable to login' });
  }
}

// Generate a JWT access token
function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '15m' });
}

// Generate a refresh token
function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
}

// Middleware to authenticate requests
// export function authenticate(req: Request, res: Response, next: any) {
//   try {
//     const token:string = req.headers.authorization?.split(' ')[1] as string;

//     // Verify the token
//     jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
//       if (err) {
//         return res.status(401).json({ error: 'Invalid token' });
//       }

//       // Attach the user ID to the request object
//       req.userId = decoded.userId;
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to authenticate' });
//   }
// }
