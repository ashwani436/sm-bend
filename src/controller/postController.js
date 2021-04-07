import mongoose from 'mongoose';
import { PostSchema } from '../model/postModel';
import { errorHandler, successHandler } from '../utils';

const Post = mongoose.model("post", PostSchema);

export const addNewPost = (req, res) => {
    req.body.uid = req.authUser.userid;
    req.body.photos = req.file.filename;
    console.log(req.body);
    let newPost = new Post(req.body);
    newPost.save((err, newPost) => {
        errorHandler(err, res);
        successHandler(newPost, res, 201);
    })
}