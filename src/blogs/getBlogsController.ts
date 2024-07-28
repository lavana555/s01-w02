import {db} from "../db/db";
import {Request, Response} from 'express'



export const getBlogsController = (req: Request, res: Response<any>) => {

    const blogs = db.blogs

    res
        .status(200)
        .json(blogs) // отдаём видео в качестве ответа

}
