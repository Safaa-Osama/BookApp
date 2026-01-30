import express from 'express';
import { testConnection } from './DB/connection.js';
import { authorRouter } from './Modules/author/author.controller.js';
import { bookRouter } from './Modules/book/book.ontroller.js';
import { logsRouter } from './Modules/logs/logs.controller.js';
const app = express();
const port = 3000;


export const bootstrap = () => {
    app.use(express.json());
    app.get('/', (req, res, next) => { res.send('Hello World!') });

    testConnection();

    app.use('/authors', authorRouter);
    app.use('/books', bookRouter);
    app.use('/logs', logsRouter);



    app.use('{/*demo}', (req, res, next) => { res.status(404).json({ message: `URL ${req.originalUrl} IS NOT FOUND` }) });

    app.listen(port, () => { console.log(`My app is listening on port ${port}`) });
}




