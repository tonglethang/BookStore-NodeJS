
import mongoose from 'mongoose';
import Book from '../Models/Book.js';
import multer from 'multer';
import fs from 'fs';
import mongo from 'mongodb';
import path  from 'path';


var db = mongoose.connection;


export function getBooks(req, res, err){
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
                            sessionUser: req.session.userName
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