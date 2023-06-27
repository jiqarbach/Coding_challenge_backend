import { Request, Response } from 'express';
import Question from '../models/question.model';
import User from '../models/user.model';

export async function addQuestion(req: Request, res: Response) {
    try {
        const {
            title,
            content,
            lat,
            lng,
            userId
        } = req.body;

        const newQuestion = await Question.create({
            title,
            content,
            lat,
            lng,
            userId
        });

        if (!newQuestion)
            res.status(500).json('Unable to add question');

        res.status(201).send('Question added succesfully');
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

export async function getQuestions(req: Request, res: Response) {
    try {

        const questions = await Question.findAll({
            include: [
                { model: User, as: 'user' }
            ]
        });

        res.status(200).json(questions);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to find questions' });
    }
}

export async function getQuestionById(req: Request, res: Response) {
    try {
        const id = req.params.id

        const newQuestion = await Question.findOne({ where: { questionId: id } });

        if (!newQuestion)
            res.status(200).json('No question found');

        res.status(200).json(newQuestion);
    }
    catch (error) {
        res.status(500).json({ error: 'Question not found' });
    }
}

// Get Questions Sorted by Location 
