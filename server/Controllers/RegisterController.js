import mongoose from 'mongoose';
import User from '../Models/User.js';
import bcrypt  from 'bcrypt'


export  function createUser (req, res, err) {
    var username = req.body.username;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    const data = {username: username, email: email, phonenumber: phonenumber, fullname: req.body.fullname}; 
    User.find({ username: username})
        .then((users) => {
            if(users.length > 0) {
                return res.render('pages/Register', { 
                    data: data,
                    error1: "Tên đăng nhập đã tồn tại !",
                    error2: null,
                    error3: null
                }) 
            }
            User.find({email: email})
                .then((users) => {
                    if(users.length > 0) {
                        return res.render('pages/Register', { 
                            data: data,
                            error1: null,
                            error2: "Email đã tồn tại !",
                            error3: null
                        }) 
                    }
                    User.find({phonenumber: phonenumber})
                    .then(async (users) => {
                        if(users.length > 0) {
                            return res.render('pages/Register', { 
                                data: data,
                                error1: null,
                                error3: "Email đã tồn tại !",
                                error2: null,
                            }) 
                        }
                        const user = new User(req.body);
                        user._id = mongoose.Types.ObjectId(),
                        user.time_create = new Date();
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                        return user.save().then(() => {
                            return res.redirect('/')
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).json({
                                success: false,
                                message: 'Fail register . Please try again.',
                                error: error.message,
                        });
                        });
                    })
                })
        })
}