import Joi from "joi";
import {Request, Response} from 'express'
import {db} from "../db/db";


const findBlogScheme = Joi.object({
    id:Joi.string().required()
})



export const findBlogController = (req: Request, res:Response) => {
    const {error:paramsError, value:paramsValue} = findBlogScheme.validate(req.params);

    if(paramsError) {
        return res.status(404).json({
            errorMessage: paramsError.details.map(err=>({
                message: err.message,
                field: err.context?.key
            }))
        })
    }
    const findValue = db.blogs.find(({id})=> id === paramsValue.id)
    if(findValue) {
       return  res.status(200).json(findValue)
    } else {
        return res.status(404).json({
            errorMessage: [
                {
                    message: 'Blog not found',
                    field: "id"
                }
            ]
        })
    }

}
