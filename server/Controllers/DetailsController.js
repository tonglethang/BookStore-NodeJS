
import Book from '../Models/Book.js';
import mongo from 'mongodb';

export function  getBookDetails(req, res, err){
    try{
        const id  = req.params.id;
        Book.findById(id)
            .then((book) => {
                Book.find({type: book.type}).limit(8)
                    .then((book_related) => {
                        const book_related2 = book_related.filter((item) => item.id !== id);
                        return res.render('pages/Details', {
                            book: book,
                            book_related: book_related2,
                        })
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Can not find book ',
                    error: err.message,
                })
            })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}
