import { Router } from 'express'
import * as LS from './logs.services.js'

export const logsRouter = Router();

logsRouter.post('/:id', LS.addLog);