import Joi from "joi";
import { Request, Response } from 'express';
import { db } from "../db/db";

const PostIdSchema = Joi.object({
    id: Joi.string().required()
});

const PostSchema = Joi.object({
    title: Joi.string().max(30).required(),
    shortDescription: Joi.string().max(100).required(),
    content: Joi.string().max(1000).required(),
    blogId: Joi.string().required()
});

const updatePostSendReq = (bodyValue: any, paramsValue: any, res: any) => {
    const postIndex = db.posts.findIndex(({ id }) => id === paramsValue.id);
    if (postIndex !== -1) {
        db.posts[postIndex] = {
            ...db.posts[postIndex],
            ...bodyValue,
            blogId: bodyValue.blogId || db.posts[postIndex].blogId,
        };
        return res.status(204).send();
    }
    return res.status(404).json({
        errorsMessages: [
            {
                message: 'Post not found',
                field: "id"
            }
        ]
    });
};

export const updatePostController = (req: Request, res: Response) => {
    const { error: paramsError, value: paramsValue } = PostIdSchema.validate(req.params);
    const { title, shortDescription, content, blogId } = req.body;
    const { error: bodyError, value: bodyValue } = PostSchema.validate({ title, shortDescription, content, blogId }, { abortEarly: false });

    if (paramsError) {
        return res.status(404).json({
            errorsMessages: paramsError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }))
        });
    }

    if (bodyError) {
        return res.status(400).json({
            errorsMessages: bodyError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }))
        });
    }

    if (bodyValue.blogId) {
        const findBlog = db.blogs.find(({ id }) => id === bodyValue.blogId);
        if (!findBlog) {
            return res.status(400).json({
                errorsMessages: [
                    {
                        message: 'Blog not found',
                        field: "blogId"
                    }
                ]
            });
        }
    }

    return updatePostSendReq(bodyValue, paramsValue, res);
};
