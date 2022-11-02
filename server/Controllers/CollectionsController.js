
import Book from '../Models/Book.js';


export function getBooksCollections(req, res, err){
    try{
        let perPage = 20;
        let page = req.query.page || 1;
        var key = req.query.key || null;
        var sort = req.query.sort_type || null;
        if(key == null){
            Book.find()
                .then((allBooks) => {
                    Book.countDocuments((count) => {
                        getSort(sort, allBooks);
                        var books = allBooks.slice((perPage * page)- perPage, perPage *page );
                        return res.render('pages/collections', { 
                            current: page, // page hiện tại
                            pages: Math.ceil(count/ perPage), // tổng số các page
                            books: books,
                            filter: sort,
                        })
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                    success: false,
                    message: 'Server error . Please try again.',
                    error: err.message,
                    });
                })
        }
        else{
            Book.find({"name":  new RegExp(key ,"i")})
            .then((allBooks) => {
                var count = allBooks.length
                var books = allBooks.slice((perPage * page)- perPage, perPage *page );
                return res.render("pages/collections", {
                    current: page, // page hiện tại
                    pages: Math.ceil(count/ perPage), // tổng số các page
                    books: books,
                    filter: sort,
                    sessionUser: req.session.userName
                })

            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}

function getSort(sort, books){
    switch(sort){
        case '1':
            books.sort(function(a,b){
                return new Date(b.time_create) - new Date(a.time_create);
            });
            break;
        case '2':
            books.sort(function(a,b){
                return new Date(a.time_create) - new Date(b.time_create);
            });
            break;
        case '3':
            //san pham ban chay
            break;
        case '4':
            books.sort(sort_by1('price', true, parseInt));
            break;
        case '5':
            books.sort(sort_by2('price', true, parseInt));
            break;
        case '6':
            books.sort(sort_by1('name', false,  (a) =>  a.toUpperCase()));
            break;
        case '7':
            books.sort(sort_by2('name', false,  (a) =>  a.toUpperCase()));
            break;
    }
}

//function sort by price  high to low or case-insensitive A-Z
const sort_by1 = (field, reverse, primer) => {

    const key = primer ?
      function(x) {
        return primer(x[field])
      } :
      function(x) {
        return x[field]
      };
  
    reverse = !reverse ? 1 : -1;
  
    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }
const sort_by2 = (field, reverse, primer) => {

    const key = primer ?
      function(x) {
        return primer(x[field])
      } :
      function(x) {
        return x[field]
      };
  
    reverse = !reverse ? 1 : -1;
  
    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
    }
  }
  
  