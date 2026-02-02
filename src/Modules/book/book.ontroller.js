import { Router } from 'express';
import * as BS from './book.services.js';

export const bookRouter = Router();

bookRouter.get('/', BS.allBooks);

bookRouter.get('/genre', BS.bookByGenre)
bookRouter.get('/skip-limit', BS.skipLimit);
bookRouter.get('/year-integer', BS.yearInteger);
bookRouter.get('/exlude-genres', BS.excludeGenres);

bookRouter.get('/aggregate1', BS.bookAgregate1 );
bookRouter.get('/aggregate2', BS.bookAgregate2 );
bookRouter.get('/aggregate2', BS.bookAgregate3 );
bookRouter.get('/aggregate4',BS.bookAgregate4)



bookRouter.get('/:title', BS.bookByTitle);
bookRouter.get('/:year_1/:year_2', BS.booksByYear);

bookRouter.post('/', BS.addBook);
bookRouter.post('/add-many-Books', BS.addMoreBooks);

bookRouter.patch('/:title',BS.patchBook);

bookRouter.delete('/before-year', BS.deleteBook);
