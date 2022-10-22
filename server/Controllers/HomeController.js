
import mongoose from 'mongoose';
import Book from '../Models/Book.js';
import multer from 'multer';
import fs from 'fs';
import mongo from 'mongodb';
import path  from 'path';


var db = mongoose.connection;

export function getBooks(req, res, err){
    var sortseller = {name: -1};
    var sortsale = {sale: -1};
    var time = new Date();
    console.log("timeee: " + time);

    Book.find()
        .then((allNewBook) => { 
            //sort by date 
            allNewBook.sort(function(a,b){
                return new Date(b.time_create) - new Date(a.time_create);
            });
            const newBook = allNewBook.slice(0,8);
            Book.find().sort(sortseller).limit(8)
            .then((allSellerBook) => {
                Book.find().sort(sortsale).limit(10)
                    .then((saleBooks) => {
                        return res.render('pages/home',{
                            newbooks: newBook,
                            sellerbooks: allSellerBook,
                            books: saleBooks
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