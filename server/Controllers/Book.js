import mongoose from 'mongoose';
import Book from '../Models/Book.js';
import multer from 'multer';
import fs from 'fs';
import mongo from 'mongodb';
import path  from 'path';

const dir = path.join('public/uploads');
//connect mongodb
var db = mongoose.connection;

// create new book
export function createBook (req, res) {
    //set address book image
    var name_image;
    const Storage = multer.diskStorage({
        destination: dir,
        filename: (req, file, cb) => {
            name_image =  Date.now() + file.originalname
            cb(null, name_image);
        }
    })
    const upload = multer({
        storage: Storage,
    }).single('image')
    // Upload book
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            var type = getTypeBook(req.body.type);
            const book = new Book({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                price: req.body.price,
                nhaxuatban: req.body.nhaxuatban,
                namxuatban: req.body.namxuatban,
                tacgia: req.body.tacgia,
                sotrang: req.body.sotrang,
                kichthuoc: req.body.kichthuoc,
                soluongbandau: req.body.soluongbandau,
                soluongcon: req.body.soluongcon,
                type: type,
                discount: req.body.discount,
                mota: req.body.mota,
                image:{
                    data: name_image,
                    contentType: req.file.mimetype,
                },
                time_create: new Date(),
            });
            console.log("Upload image successfully");
            //save book
            return book
            .save()
            .then(() => {
                return res.redirect('/book')
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
            });
            });
        }
    })

  }

export function getAllBook(req, res){
    Book.find()
        .then((allBook) => {
            return res.render('admin/index',{
                books: allBook,
            })
        })
        .catch((err) => {
            res.status(500).json({
              success: false,
              message: 'Server error. Please try again.',
              error: err.message,
            });
          });
}
export function getBook(req, res) {
    const id = req.params.id;
    Book.findById(id)
        .then((Book) => {
            return res.render('admin/update',{
                book: Book,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Can not find book ',
                error: err.message,
            })
        })
}
export function updateBook(req, res) {
    const id = req.params.id;
    var id_find = new mongo.ObjectId(id);
    var query = { _id: id_find};

    db.collection("books").find(query).toArray(function(err, result) {
        if (err) throw err;
        var filePath = 'public/uploads/' + result[0].image.data;
        console.log(filePath);
        fs.unlinkSync(filePath);
    });
    var name_image;
    const Storage = multer.diskStorage({
        destination: dir, 
        filename: (req, file, cb) => {
            name_image =  Date.now() + file.originalname
            cb(null, name_image);
        }
    })
    const upload = multer({
        storage: Storage,
    }).single('image')

    //find book in mongodb
    Book.findById(id);
    //upload book to mongodb
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            const bookUp = new Book({
                name: req.body.name,
                price: req.body.price,
                nhaxuatban: req.body.nhaxuatban,
                namxuatban: req.body.namxuatban,
                tacgia: req.body.tacgia,
                sotrang: req.body.sotrang,
                kichthuoc: req.body.kichthuoc,
                soluongbandau: req.body.soluongbandau,
                soluongcon: req.body.soluongcon,
                type: req.body.type,
                discount: req.body.discount,
                mota: req.body.mota,
              
                image:{
                    data: name_image,
                    contentType: 'image/png' 
                },
                time_update: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}),
            });
            console.log("Upload image successfully");

            Book.updateOne({_id: id_find}, {$set:bookUp})
            .exec()
            .then(() =>  {
                res.redirect('/book');
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Server error: ' + err.message,
                })
            })
        }
    })
}

export function deleteBook(req, res) {
    const id = req.params.id;
    Book.findByIdAndRemove(id)
        .exec()
        .then(() => res.redirect('/book'))
        .catch((err) => res.status(500).json({
            success: false,
        }));
}

//get type book
function getTypeBook(value_type){
    var type;
    switch(value_type){
        case '1': 
            type = "Sách thiếu nhi";
            break;
        case '2':
            type = "Sách ngoại ngữ";
            break;
        case '3':
            type = "Sách nấu ăn";
            break;
        case '4':
            type = "Sách kinh tế";
            break;  
        case '5':
            type = "Trinh thám";
            break;
        case '6':
            type = "Sách văn học";
            break;
        case '7':
            type = "Sách tâm lý-Kỹ năng sống";
            break;
        case '8':
            type = "Sách giáo khoa";
            break;
        case '9':
            type = "Từ điển";
            break;
        default:
            type = "Lọai khác";
            break;
    }
    return type;
}