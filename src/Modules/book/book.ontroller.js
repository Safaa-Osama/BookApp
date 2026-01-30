import { Router } from 'express'
import * as PS from './book.services.js'

export const bookRouter = Router();

bookRouter.get('/', PS.allBooks);
bookRouter.get('/:title', PS.bookByTitle);
bookRouter.get('/:year_1/:year_2', PS.booksByYear);
bookRouter.get('/genre', PS.bookByGenre)
bookRouter.get('/skip-limit', PS.skipLimit);
bookRouter.get('/year-integer', PS.yearInteger);


bookRouter.post('/', PS.addBook);
bookRouter.post('/add-many-Books', PS.addMoreBooks);

bookRouter.patch('/:title',PS.patchBook);