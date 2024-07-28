import {db} from "../db/db";
import {Request, Response} from 'express'



export const getPostsController = (req:Request, res:Response) => {
    const posts = db.posts;
    return res.status(200).json(posts);
}
