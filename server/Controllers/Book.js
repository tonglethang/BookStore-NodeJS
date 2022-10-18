import mongoose from 'mongoose';
import Book from '../Models/Book.js';
// create new cause
export function createBook (req, res) {
    const book = new Book({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      nhaxuatban: req.body.nhaxuatban,
      namxuatban: req.body.namxuatban,
      tacgia: req.body.tacgia,
      sotrang: req.body.sotrang,
      kichthuoc: req.body.kichthuoc,
      soluongbandau: req.body.soluongbandau,
      soluongcon: req.body.soluongcon,
      mota: req.body.mota,
    });
    
    return book
      .save()
      .then((allBook) => {

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

export function getAllBook(req, res){
    Book.find()
        .then((allBook) => {
            return res.render('pages/index',{
                books: allBook,
                key: "thang"
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
            return res.render('pages/update',{
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
    const bookUp = req.body;
    Book.update({_id:id}, {$set:bookUp})
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

export function deleteBook(req, res) {
    const id = req.params.id;
    Book.findByIdAndRemove(id)
        .exec()
        .then(() => res.redirect('/book'))
        .catch((err) => res.status(500).json({
            success: false,
        }));
}

