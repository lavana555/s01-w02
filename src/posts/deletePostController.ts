import Joi from "joi";
import {Request, Response} from 'express';
import {db} from "../db/db";


const postIdScheme = Joi.object ({
    id:Joi.string().required()
})

export const deletePostController = (req: Request, res: Response) => {
    const {error, value} = postIdScheme.validate(req.params);
    if(error) {
        return res.status(404).json({
            errorMessage: error.details.map(err =>({
                message: err.message,
                field: err.context?.key
            }))
        })
    }
    const findPostIndex = db.posts.findIndex(({id})=> id === value.id);
    if(findPostIndex !== -1) {
        db.posts.splice(findPostIndex, 1);
        return res.status(204).send()
    }
    return res.status(404).json({
        errorMessage: [
            {
                message: 'Post not found',
                filed: "id"
            }
        ]
    })
}
