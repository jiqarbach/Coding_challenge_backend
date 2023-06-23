import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
let bodyParser = require('body-parser')
let cors = require('cors')
// import authRoutes from './routes/auth.route'

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
}))


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/auth', require('./routes/auth.route'))
app.use('/questions', require('./routes/questions.route'))
app.use('/answers', require('./routes/answers.routes'))



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
