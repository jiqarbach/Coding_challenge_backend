import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();


// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
