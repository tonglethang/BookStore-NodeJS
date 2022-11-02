import mongoose from 'mongoose';
import User from '../Models/User.js';
import bcrypt  from 'bcrypt';


export  function createUser (req, res, err) {
    try{
        res.locals.sessionUser = req.session.userName;
        res.locals.success_messages = req.flash('success');
        res.locals.error_messages = req.flash('error');

        var username = req.body.username;
        var email = req.body.email;
        var phonenumber = req.body.phonenumber;
        const data = {username: username, email: email, phonenumber: phonenumber, fullname: req.body.fullname}; 
        User.find({ username: username})
            .then((users) => {
                if(users.length > 0) {
                    return res.render('pages/User/Register', { 
                        data: data,
                        error1: "Tên đăng nhập đã tồn tại !",
                        error2: null,
                        error3: null,
                    }) 
                }
                User.find({email: email})
                    .then((users) => {
                        if(users.length > 0) {
                            return res.render('pages/User/Register', { 
                                data: data,
                                error1: null,
                                error2: "Email đã tồn tại !",
                                error3: null,
                            }) 
                        }
                        User.find({phonenumber: phonenumber})
                        .then(async (users) => {
                            if(users.length > 0) {
                                return res.render('pages/User/Register', { 
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
                            req.flash('success',"Bạn đã đăng ký thành công !")
                            return user.save().then(() => {
                                return res.redirect('/')
                            })
                            .catch((error) => {
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
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}

export function loginUser(req, res) {
    try{
        res.locals.sessionUser = req.session.userName;
        res.locals.success_messages = req.flash('success');
        res.locals.error_messages = req.flash('error');
        if(req.session.userName) {
            res.redirect("/");
        }
        else{
            const user = {username: req.body.username, password: req.body.password}
            try{
                User.find({username: user.username})
                .then( async (result) => {

                    if(result.length > 0 &&  bcrypt.compareSync(user.password, result[0].password)) {
                        const user = result[0];
                        req.session.userName = user.username;
                        req.flash('success',"Bạn đã đăng nhập thành công !")
                        return res.redirect("/")
                    }
                    else{
                        return res.render('pages/User/Login', {
                            error: "Thông tin đăng nhập không chính xác !",
                        })
                    }
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
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    }
}

export function logoutUser(req, res){
    if(req.session.userName){
        delete req.session.userName;
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
}

export function getUser(req, res) {
    if(req.session.userName){
        res.render('pages/User/ChangePass', {
            error: null,
        })
    }
    else{
        res.render('/');
    }
}

export function changePass(req, res, err){
    try{
        var username  = req.session.userName;
        var pass = req.body.password_old;
        res.locals.success_messages = req.flash('success');
            res.locals.error_messages = req.flash('error');
        var pass_new = req.body.password;
        User.find({username: username})
            .then( async (result) => {
                if(bcrypt.compareSync(pass, result[0].password)) {
                    const user = result[0];
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(pass_new , salt);
                    User.updateOne({username: username}, {$set: user})
                        .exec()
                        .then(() =>{
                            req.flash('success',"Bạn đã đổi mật khẩu thành công !")
                            return res.redirect('back')
                        })
                }
                else{
                    return res.render('pages/User/ChangePass',{
                        error: "Mật khẩu không chính xác !",
                        sessionUser: req.session.userName,
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'Server error . Please try again.',
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