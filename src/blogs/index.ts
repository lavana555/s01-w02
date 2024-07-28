import { Router } from "express";
import { getBlogsController } from "./getBlogsController";
import { postBlogsController } from "./postBlogsController";
import {authMiddleware} from "../middleware/authMidleware";
import {findBlogController} from "./findBlogController";
import {updateBlogController} from "./updateBlogController";
import {deleteBlogController} from "./deleteBlogController"; // Ensure this import is included

export const blogsRouter = Router();

blogsRouter.get('/', getBlogsController);
blogsRouter.post('/',
    authMiddleware,
    postBlogsController,
);
blogsRouter.get('/:id', findBlogController)
blogsRouter.put('/:id',
    authMiddleware,
    updateBlogController
);
blogsRouter.delete('/:id',
    authMiddleware,
    deleteBlogController
    )
