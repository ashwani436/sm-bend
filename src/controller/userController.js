import mongoose from 'mongoose';
import { sendmail } from '../mailer';
import { UserSchema } from '../model/userModel';
import { errorHandler, hashItUp, successHandler } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = mongoose.model("user", UserSchema);

export const addNewUser = async (req, res) => {
    req.body.password = await hashItUp(req.body.password);
    let newUser = new User(req.body);
    newUser.save((err, newUser) => {
        errorHandler(err, res);
        // sendmail(newUser.email,
        //     "Welcome to Princebook", 
        //     `<p>Please click the button below to confirm your email</p><br/>
        //     <a href="https://princebook.com/confirm/${newUser.confirm}"><button>Confirm your email</button></a>`
        //     )
        successHandler(newUser, res, 201);
    })
}

export const confirmUser = (req, res) => {

    User.findOneAndUpdate(
            { confirm: req.params.confirmHash}, 
            {confirm: "1"}, 
            {new: true, useFindAndModify: false},
            (err, updatedResult) => {
                errorHandler(err, res);
                successHandler(
                    {message:`User ${updatedResult.name}(${updatedResult.email}) was confirmed successfully`}, 
                    res, 
                    200);
            }
    )

}

export const authenticate = (req, res) => {

    User.findOne({email: req.body.email}, async (err, user) => {
        if (user === null) {
            errorHandler("The email does not exist", res, 401);
        } else {
            let passwordMatch = await bcrypt.compare(req.body.password, user.password)
            if(passwordMatch) {

                if(user.confirm === "1") {
                    let token = jwt.sign(
                            { 
                                userid: user._id,
                                role: user.role
                            },
                            "SOME_SECRET_KEY"
                    )
                    successHandler({access_token : token}, res, 200)
                } else {
                    errorHandler(
                        "Unauthorized, please confirm your email",
                        res,
                        401
                    )
                }

            } else {
                errorHandler(
                    "Unauthorized, please check your password",
                    res,
                    401
                )
            }
        }
    })

}

export const getAllUsers = (req, res) => {

    User.find({}, (err, allUsers) => {
        errorHandler(err, res);
        successHandler(allUsers, res, 200)
    })

}

export const loginRequired = (req, res, next) => {
    if (req.authUser) {
        next();
    } else {
        errorHandler(
            "Unauthorized, Please login to see this data",res, 401
        )
    }

}

export const currentUser = (req, res) => {
    let uid = req.authUser.userid;
    User.findById(uid, async (err, user) => {
        errorHandler(err, res);
        successHandler(user, res, 200);
    })

}

export const imgUpload = (req, res) => {
    console.log(req.file);
    res.send({path: req.file.filename});
}

export const updateDp = (req, res) => {
    let uid = req.authUser.userid;
    let change = { avatar: req.file.filename};
    User.findOneAndUpdate(
        { _id : uid}, 
        change, 
        {new: true, useFindAndModify: false},
        (err, updatedUser) => {
            errorHandler(err, res);
            successHandler(
                updatedUser,
                res, 
                200);
    }
)

}
