const User = require("../models/user");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

class UserController{
    static register(req, res, next){

        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(userData)
            .then((newUser) => {
                res.status(200).json(newUser);
            })
            .catch((err) => {
                next(err);
            });
        
    }

    static login(req, res, next){

        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        let user;
        User.findOne({email: userData.email})
            .then((data) => {
                user = data;

                if(user){
                    return bcrypt.compare(userData.password, user.password);
                }else{
                    next({code: 401, message: "Email or password is invalid"});
                }
            })
            .then((isValid) => {
                if(isValid){

                    const payload = {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }

                    const token = jwt.sign(payload);

                    res.status(200).json({id: payload.id, token});

                }else{
                    next({code: 401, message: "Email or password is invalid"});
                }
            })
            .catch((err) => {
                next(err);
            })

    }
}

module.exports = UserController;