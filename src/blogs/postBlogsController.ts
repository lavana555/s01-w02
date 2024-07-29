import { NextFunction } from "express";
import Joi from "joi";
import { BlogTypes } from "../db/blog-types";
import { Request, Response } from 'express';
import { db } from "../db/db";

const createBlogSchema = Joi.object({
    name: Joi.string().max(25).required(),
    description: Joi.string().max(500).required(),
    websiteUrl: Joi.string().max(100).pattern(new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')).required()
});

export const postBlogsController = (req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const { error, value } = createBlogSchema.validate({name, description, websiteUrl}, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errorsMessages: error.details.map(err => ({
                message: err.message || null,
                field: err.path[0] || null
            }))
        });
    }

    const newBlog: BlogTypes = {
        id: Math.floor(Date.now() + Math.random() * 1000).toString(),
        name: value.name,
        description: value.description,
        websiteUrl: value.websiteUrl
    };

    db.blogs.push(newBlog);
    return res.status(201).json(newBlog);
};
