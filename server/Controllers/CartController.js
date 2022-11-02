import Book from '../Models/Book.js';
import User from '../Models/User.js';
import Cart from '../Models/Cart.js';
import mongo from 'mongodb';


export function getCart(req, res, err){
    try{
        if(req.session.userName){
            Cart.find({username: req.session.userName})
                .then((carts) => {
                    return res.render('pages/User/Cart',{ 
                        carts: carts
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                    success: false,
                    message: 'Server error . Please try again.',
                    error: err.message,
                    });
                });
        }
        else{
            req.flash('error', 'Bạn cần đăng nhập để thực hiện chức năng này !')
            res.redirect('back')
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

export function createCart(req, res,err) {
    try {
        if(req.session.userName){
            var idBook = req.params.id;
            var quantity = req.body.quantity;
            var username = req.session.userName;
            Cart.find({username: username})
                .then((carts) => {
                const cart = carts.find( data => data.idBook === idBook);
                if(cart) {
                    var price = cart.price * quantity;
                    var price_up = parseInt(cart.total_price) + price;
                    var id_find = new mongo.ObjectId(cart._id);
                    var quantityUp = parseInt(cart.quantity) + parseInt(quantity);

                    Cart.updateOne({"_id": id_find}, {$set: {"quantity": quantityUp, "total_price": price_up}}).exec();
                    req.flash('success','Bạn đã thêm sản phẩm vào giỏ hàng !')
                    return res.redirect('back');
                }
                else{
                    Book.findById(idBook)
                        .then((book) =>{
                            var price = parseInt(book.price) - ((parseInt(book.price) / 100) * parseInt(book.discount));
                            var total_price = (parseInt(book.price) - ((parseInt(book.price) / 100) * parseInt(book.discount))) * quantity;
                            const cartBook = new Cart({
                                idBook: idBook,
                                nameBook: book.name,
                                username: req.session.userName,
                                price: price,
                                total_price: total_price,
                                quantity: quantity,
                                max_quan: book.soluongcon,
                                image: book.image.data,
                            })
                            req.flash('success', 'Bạn đã thêm sản phẩm vào giỏ hàng thành công!')
                            return cartBook.save().then(()=>{
                                res.redirect('back');
                            })
                        })
                }
            })
        }
        else{
            req.flash('error', 'Bạn cần đăng nhập để thực hiện chức năng này !')
            res.redirect('back')
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

export function updateCart(req, res, err){
    try{
        var quantity = req.query.quantity;
        var arr = quantity.split('');
        var username = req.session.userName;
        if(arr.length == 0){ 
            req.flash('error',"Vui lòng thêm sản phẩm vào giỏ hàng !")
            res.redirect('back')
        }
        Cart.find({username: username})
            .then((carts)=>{
                for(var i=0; i<carts.length; i++){
                    console.log(arr[i])
                    var price = carts[i].price * arr[i];
                    var id_find = new mongo.ObjectId(carts[i]._id);
                    Cart.updateOne({"_id": id_find}, {$set: {"quantity": arr[i], "total_price": price}}).exec();
                }
            })
        req.flash('success',"Bạn đã cập nhật giỏ hàng thành công !")
        res.redirect('back')
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}

export function deleteCart(req, res, err) {
    try{
        var id = req.query.id;
        Cart.findByIdAndRemove(id).exec();
        req.flash('success',"Đã xóa sản phẩm khỏi giỏ hàng !")
        res.redirect('back');
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}