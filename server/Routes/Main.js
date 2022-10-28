import express from 'express';
import { createBook, getAllBook, getBook, updateBook, deleteBook } from '../Controllers/Book.js';
import { getBooks } from '../Controllers/HomeController.js'; 
import { getBookDetails } from '../Controllers/DetailsController.js'
import { getBooksCollections} from '../Controllers/CollectionsController.js';
import { createUser,loginUser, logoutUser} from '../Controllers/UserController.js'


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
        data: null,
        sessionUser: req.session.userName,
    })
})
router.post('/account/register',  createUser);

//login user
router.get('/account/login', (req, res) =>{
    delete req.session.userName;
    res.render('pages/Login', {
        error: null,
        sessionUser: req.session.userName,
    })
})
router.get('/account/logout', logoutUser);
router.post('/account/login', loginUser);