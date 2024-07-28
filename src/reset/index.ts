import {resetController} from "./resetController";
import {Router} from "express";


export const resetRouter = Router();


resetRouter.delete('/', resetController);
