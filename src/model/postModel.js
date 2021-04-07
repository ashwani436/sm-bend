import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
    uid : {
        type: String,
        required: "User ID is mandatory"
    },
    text : {
        type: String,
        default: null
    },
    photos: {
        type: String,
        default: null
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }

});