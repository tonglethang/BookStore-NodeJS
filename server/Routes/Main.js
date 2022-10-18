import express from 'express';
import { createBook, getAllBook, getBook, updateBook, deleteBook } from '../Controllers/Book.js';

const router = express.Router();
router.get('/createbook', (req, res) => {
    res.render('pages/create');
})
router.post('/createbook', createBook);
router.get('/book',getAllBook);
router.get('/updatebook/:id', getBook);
router.post('/updatebook/:id', updateBook);
router.get('/deletebook/:id', deleteBook);

export default router;