import Joi from "joi";
import {Request, Response} from 'express'
import {db} from "../db/db";

const blogIdScheme = Joi.object({
    id:Joi.number().integer().required()
})

export const deleteBlogController = (req:Request, res:Response) => {
    const {error, value} = blogIdScheme.validate(req.params);

    if(error) {
        res.status(400).json({
            errorMessage: error.details.map(err =>({
                message: err.message,
                field: err.context?.key
            }))
        })
    }
    const blogIndex = db.blogs.findIndex(({id})=> id === +value.id);
    if(blogIndex !== -1) {
        db.blogs.splice(blogIndex,1);
        res.status(204).send()
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
