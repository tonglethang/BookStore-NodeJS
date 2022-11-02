import express from 'express';
import { createBook, getAllBook, getBook, updateBook, deleteBook } from '../Controllers/Book.js';
import { getBooks } from '../Controllers/HomeController.js'; 
import { getBookDetails } from '../Controllers/DetailsController.js'
import { getBooksCollections} from '../Controllers/CollectionsController.js';
import { createUser,loginUser, logoutUser, changePass, getUser} from '../Controllers/UserController.js'
import { getCart, createCart, updateCart, deleteCart} from '../Controllers/CartController.js'



const router = express.Router();
export default router;

router.get('*', function(req, res, next){
    res.locals.sessionUser = req.session.userName;
    res.locals.sessionCart = req.session.Cart;
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
})

router.get('/createbook', (req, res) => {
    res.render('admin/create');
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

//Collections page
router.get('/collections', getBooksCollections);

//register
router.get('/account/register', (req, res) => {
    res.render('pages/User/Register', {
        error1: null,
        error2: null,
        error3: null,
        data: null,
    })
})
router.post('/account/register',  createUser);

//User
router.get('/account/login', (req, res) =>{
    delete req.session.userName;
    res.render('pages/User/Login', {
        error: null,
    })
})
router.get('/account/logout', logoutUser);
router.post('/account/login', loginUser);
router.get('/account/changepass',getUser);
router.post('/account/changepass', changePass);


//Cart
router.post('/cart/:id', createCart);
router.get('/cart', getCart)
router.get('/cart/update', updateCart);
router.get('/cart/delete', deleteCart);