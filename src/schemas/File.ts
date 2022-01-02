import { Schema, model } from 'mongoose';
import { File } from '../interfaces';

const schema = new Schema<File>({
    filename: { type: String, required: [true, 'The filename is required'], unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'The user uploading the file is required'] },
    date: { type: Date, default: Date.now }
});

export const fileSchema = model<File>('File', schema);