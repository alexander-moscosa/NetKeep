import { Date, Schema } from 'mongoose';
 
export interface File {
    filename: string,
    user: Schema.Types.ObjectId,
    date: Date
}