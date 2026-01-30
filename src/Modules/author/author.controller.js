import { Router } from "express"
import * as AR from './author.services.js'


export const authorRouter = Router();

authorRouter.post('/', AR.creatauthor)
authorRouter.post('/add', AR.addAuthors)


