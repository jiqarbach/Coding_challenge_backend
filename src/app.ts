import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
var bodyParser = require('body-parser')
// import authRoutes from './routes/auth.route'

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/auth', require('./routes/auth.route'))

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
