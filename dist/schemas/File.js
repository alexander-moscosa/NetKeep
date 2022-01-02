"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSchema = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    filename: { type: String, required: [true, 'The filename is required'], unique: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: [true, 'The user uploading the file is required'] },
    date: { type: Date, default: Date.now }
});
exports.fileSchema = (0, mongoose_1.model)('File', schema);
