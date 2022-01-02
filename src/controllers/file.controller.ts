import { Request, Response } from 'express';
import { fileSchema } from '../schemas/File';

// Upload File to Server
export const uploadFile = ( req: Request | any, res: Response ): Response | void => {

    // Getting user from token
    const user = req.user;
    
    // Validating if someone´s trying to upload a file
    if ( !req.files.file ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'File Not Found!'
            }
        });
    }

    // Asignando el objeto a una variable
    const file = req.files.file;

    // Making the new name of the file
    const name = file.name.split('.');
    const mime = name.pop();
    const filename = `${ name }_NK_${ new Date().getTime() }.${mime}`;

    // Posting a new register to the DB
    const filedb = new fileSchema({
        filename,
        user: user._id
    });

    filedb.save(( err, fileup ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        file.mv( `./uploads/${ filename }`, err => {

            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                success: {
                    message: 'File uploaded successfully!',
                    file: fileup,
                    moreinfo: file
                }
            });
        });
    });
}