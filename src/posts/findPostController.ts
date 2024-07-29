import Joi from "joi";
import {Request, Response} from 'express'
import {db} from "../db/db";



const PostIdScheme = Joi.object({
    id:Joi.string().required()
})

export const findPostController = (req: Request, res: Response) => {
    const {error, value} = PostIdScheme.validate(req.params)

    if(error) {
        return res.status(404).json({
            errorMessage: error.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }
    const findPost = db.posts.find(({id}) => id === value.id);
    if(findPost) {
      return  res.status(200).json(findPost);
    }
    return res.status(404).json({
        errorMessage: [
            {
                message: 'Post not found',
                field: "id"
            }
        ]
    });}
