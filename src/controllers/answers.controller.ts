import { Request, Response } from 'express';
import Answer from '../models/answer.model';

export async function addAnswer(req: Request, res: Response) {
    try {
        const {
            content,
            userId,
            questionId
        } = req.body;

        const newAnswer = await Answer.create({
            content,
            userId,
            questionId
        });

        if (!newAnswer)
            res.status(500).json('Unable to add answer');

        res.status(201).send('Answer added succesfully');
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to add answer' });
    }
}

export async function getAnswersByQstID(req: Request, res: Response) {
    try {
        const id = req.params.id
        
        const answers = await Answer.findAll({where: {questionId: id}});

        res.status(200).json(answers);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to find questions' });
    }
}


