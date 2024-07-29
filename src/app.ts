import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./blogs";
import {resetRouter} from "./reset";
import {resetController} from "./reset/resetController";
import {postsRouter} from "./posts";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    res.status(200).json({version: '1.6'})
})
app.use(SETTINGS.PATH.TESTING, resetRouter);
app.delete(SETTINGS.PATH.TESTING, resetController)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)

