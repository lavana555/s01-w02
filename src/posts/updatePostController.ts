import Joi from "joi";
import { Request, Response } from 'express';
import { db } from "../db/db";

const PostIdSchema = Joi.object({
    id: Joi.string().required()
});

const PostSchema = Joi.object({
    title: Joi.string().max(30),
    shortDescription: Joi.string().max(100),
    content: Joi.string().max(1000),
    blogId: Joi.string()
});

const updatePostSendReq = (bodyValue:any, paramsValue:any, res:any) => {
    const postIndex = db.posts.findIndex(({ id }) => id === +paramsValue.id);
    if (postIndex !== -1) {
        db.posts[postIndex] = {
            ...db.posts[postIndex],
            ...bodyValue,
            blogId: bodyValue.blogId || db.posts[postIndex].blogId,
        };
        return res.status(204).send();
    }
    return res.status(404).json({
        errorMessage: [
            {
                message: 'Post not found',
                field: "id"
            }
        ]
    });
};

export const updatePostController = (req: Request, res: Response) => {
    const { error: paramsError, value: paramsValue } = PostIdSchema.validate(req.params);
    const { error: bodyError, value: bodyValue } = PostSchema.validate(req.body);

    if (paramsError) {
        return res.status(400).json({
            errorMessage: paramsError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }))
        });
    }

    if (bodyError) {
        return res.status(400).json({
            errorMessage: bodyError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }))
        });
    }

    if (bodyValue.blogId) {
        const findBlog = db.blogs.find(({ id }) => id === +bodyValue.blogId);
        if (!findBlog) {
            return res.status(400).json({
                errorMessage: [
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
