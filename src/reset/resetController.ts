import { Request, Response } from 'express';
import { db } from '../db/db';

export const resetController = (req: Request, res: Response<any>) => {
    db.blogs = []; // Очищаем массив видео
    db.posts = []; // Очищаем массив видео

    res.status(204).send(); // Отправляем статус 204 без тела ответа
};
