import express from 'express';
import { addQuestion, getQuestions, getQuestionById } from '../controllers/questions.controller'

const routes = express.Router();

routes.post('/add', addQuestion);
routes.get('/get', getQuestions);
routes.get('/get/:id', getQuestionById);



module.exports = routes;