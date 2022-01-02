import { Schema, model } from "mongoose";
import { user } from '../interfaces';

const schema = new Schema<user>({
    username: { type: String, required: [true, 'Username is required!'], unique: true },
    password: { type: String, required: [true, 'Password is required!'] } 
}); 

schema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

export const userSchema = model<user>('User', schema);
