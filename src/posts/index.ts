import {Router} from "express";
import {authMiddleware} from "../middleware/authMidleware";
import {getPostsController} from "./getPostsController";
import {createPostController} from "./createPostController";
import {findPostController} from "./findPostController";
import {updatePostController} from "./updatePostController";
import {deletePostController} from "./deletePostController";


export const postsRouter = Router();

postsRouter.get('/', getPostsController)
postsRouter.post('/',
    authMiddleware,
    createPostController);
postsRouter.get('/:id', findPostController);
postsRouter.put('/:id',
    authMiddleware,
    updatePostController);
postsRouter.delete('/:id',
    authMiddleware,
    deletePostController);

