
import mongoose from 'mongoose';
import Book from '../Models/Book.js';


export function getBooks(req, res, err){
    try{
        var sortseller = {price: -1};
        var sortdiscount = {discount: -1};

        Book.find()
            .then((allNewBook) => { 
                //sort by date 
                allNewBook.sort(function(a,b){
                    return new Date(a.time_create) - new Date(b.time_create);
                });
                var newBook = allNewBook.slice(0,8);
                Book.find().sort(sortseller).limit(8)
                .then((allSellerBook) => {     
                    Book.find().sort(sortdiscount).limit(10)
                        .then((discountBooks) => {
                            return res.render('pages/home',{
                                newbooks: newBook,
                                sellerbooks: allSellerBook,
                                books: discountBooks,
                            })
                        })
                    
                })
                .catch((err) => {
                    res.status(500).json({
                    success: false,
                    message: 'Server error  2. Please try again.',
                    error: err.message,
                    });
                });
            })
            .catch((err) => {
                res.status(500).json({
                success: false,
                message: 'Server error 1 . Please try again.',
                error: err.message,
                });
            });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}