import Joi from "joi";
import { Request, Response } from 'express';
import {db} from "../db/db";
import {PostTypes} from "../db/post-types";


const postScheme = Joi.object({
    title: Joi.string().max(30).required(),
    shortDescription: Joi.string().max(100).required(),
    content: Joi.string().max(1000).required(),
    blogId: Joi.string().required(),
})


export const createPostController = (req:Request, res:Response) => {
    const {error, value} = postScheme.validate(req.body,  { abortEarly: false });
    if(error) {
        return res.status(400).jsonp({
            errorMessage: error.details.map(err => ({
                message: err.message || null,
                field: err.path[0] || null
            }))
        })
    }
    const findBlog = db.blogs.find(({id}) => id === +value.blogId);

    if(findBlog) {
        const post: PostTypes  = {
            id: Math.floor(Date.now() + Math.random() * 1000),
            shortDescription: value.shortDescription,
            content: value.content,
            title: value.title,
            blogId: +findBlog.id,
            blogName: findBlog.blogName,
        }
        db.posts.push(post);
        return res.status(201).json(post);
    }
    return  res.status(400).json({
            errorMessage: [
                {
                    message: 'Blog not found',
                    field: "id"
                }
            ]
        })
}
