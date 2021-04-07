import mongoose from 'mongoose';
import { v4 as uuidHashGenerator } from 'uuid';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name : {
        type: String,
        required: "Error: Name is mandatory"
    },
    avatar : {
        type: String,
        default: null
    },
    bio : {
        type: String,
        default: null
    },
    email : {
        type: String,
        required: "Error: Email is mandatory",
        unique: true
    },
    password : {
        type: String,
        required: "Error: Password is mandatory"
    },
    role : {
        // 0 - General, 1 - Manger, 2 - Admin
        type : Number,
        default: 0
    },
    confirm: {
        type: String,
        default: uuidHashGenerator()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});