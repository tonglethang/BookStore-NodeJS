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
                    error3: null,
                    sessionUser: req.session.userName
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
                                error3: "Số điện thoại đã tồn tại !",
                                error2: null,
                            }) 
                        }
                        const user = new User(req.body);
                        user._id = mongoose.Types.ObjectId(),
                        user.time_create = new Date();
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);

                        req.session.userName = user.username;
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

export function loginUser(req, res, next) {
    if(req.session.userName) {
        res.redirect("/");
    }
    else{
        const user = {username: req.body.username, password: req.body.password}
        try{
            User.find({username: user.username})
            .then( async (result) => {
                console.log(result);
                const salt = await bcrypt.genSalt(10);

                if(result.length > 0 &&  bcrypt.compareSync(user.password, result[0].password)) {
                    const user = result[0];
                    req.session.userName = user.username;
                    return res.redirect("/")
                }
                else{
                    return res.render('pages/Login', {
                        error: "Thông tin đăng nhập không chính xác !",
                        sessionUser: req.session.userName,
                    })
                }
            })
        }
        catch(err){
            console.error(err);
        }
    }
}

export function logoutUser(req, res){
    if(req.session.userName){
        delete req.session.userName;
        res.redirect('/');
    }
}