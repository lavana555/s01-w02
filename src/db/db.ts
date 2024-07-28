// import {VideoDBType} from './video-db-type'

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos: any[] // VideoDBType[]
    blogs: any[] // VideoDBType[]
    posts: any[] // VideoDBType[]
    // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
    videos: [],
    blogs: [],
    posts: [],
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        db.blogs = []
        db.posts = []
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    db.blogs = dataset.blogs || db.blogs
    db.posts = dataset.posts || db.posts
    // db.some = dataset.some || db.some
}
