import Joi from "joi";
import {Request, Response} from 'express'
import {db} from "../db/db";



const findBlogScheme = Joi.object({
    id: Joi.string().required()
})
const blogScheme = Joi.object({
    name: Joi.string().max(40),
    description: Joi.string().max(50),
    websiteUrl: Joi.string().max(100).pattern(new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')).required()
})


export const updateBlogController = (req:Request, res: Response) => {
    const {error:paramsError, value:paramsValue} = findBlogScheme.validate(req.params)
    const {name, description, websiteUrl} = req.body
    const {error:bodyError, value:bodyValue} = blogScheme.validate({name, description, websiteUrl}, { abortEarly: false })

    if(paramsError) {
        res.status(404).json({
            errorMessage: paramsError.details.map(err=>({
                message: err.message,
                field: err.context?.key
            }))
        })
    }
    if(bodyError) {
        res.status(400).json({
            errorMessage: bodyError.details.map(err=>({
                message: err.message,
                filed: err.context?.key
            }))
        })
    }
    const blogIndex =db.blogs.findIndex(({id})=> id === paramsValue.id);
    if(blogIndex !== -1) {
        db.blogs[blogIndex] = {
            ...db.blogs[blogIndex],
            ...bodyValue,
        };
        res.status(204).send();;
    } else {
        res.status(404).json({
            errorMessage: [
                {
                    message: 'Blog not found',
                    filed: "id"
                }
            ]
        })
    }

}
