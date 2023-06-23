import express from 'express';
import { addAnswer, getAnswersByQstID } from '../controllers/answers.controller'

const routes = express.Router();

routes.post('/add', addAnswer);
routes.get('/get/:id', getAnswersByQstID);


module.exports = routes;