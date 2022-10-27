import express from 'express';
import { createBook, getAllBook, getBook, updateBook, deleteBook } from '../Controllers/Book.js';
import { getBooks } from '../Controllers/HomeController.js'; 
import { getBookDetails } from '../Controllers/DetailsController.js'
import { getBooksCollections} from '../Controllers/CollectionsController.js';
import { createUser} from '../Controllers/RegisterController.js'


const router = express.Router();
router.get('/createbook', (req, res) => {
    res.render('pages/create');
})
router.post('/createbook', createBook);
router.get('/book',getAllBook);
router.get('/updatebook/:id', getBook);
router.post('/updatebook/:id', updateBook);
router.get('/deletebook/:id', deleteBook);

//homepage
router.get('/', getBooks)

//details page
router.get('/details/:id', getBookDetails);
export default router;

//Collections page
router.get('/collections', getBooksCollections);

//register
router.get('/account/register', (req, res) => {
    res.render('pages/Register', {
        error1: null,
        error2: null,
        error3: null,
        data: null
    })
})
router.post('/account/register',  createUser)