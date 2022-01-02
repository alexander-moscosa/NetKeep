"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, required: [true, 'Username is required!'], unique: true },
    password: { type: String, required: [true, 'Password is required!'] }
});
schema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
exports.userSchema = (0, mongoose_1.model)('User', schema);
