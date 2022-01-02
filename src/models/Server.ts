// Express
import express from 'express';

// Cors
import cors from 'cors';

// MongoDB
import mongoose, { ConnectOptions } from 'mongoose';

// File Upload
import upload from 'express-fileupload';

// Interfaces
import { ApiPath } from '../interfaces';

// Routes
import user_router from '../routes/user.routes';
import file_router from '../routes/file.routes';

class Server {

    private _app: express.Application;
    private _port: string;
    private _mongoURI: string;
    private _apiPath: ApiPath;

    constructor( _port: string, _mongoURI: string ) {
        this._app = express();
        this._port = _port;
        this._mongoURI = _mongoURI;
        this._apiPath = {
            user: '/api/v1/user',
            file: '/api/v1/file'
        }
    }

    public confCors(): void {
        this._app.use( cors({
            origin: '*', //! Dangerous: Change to the Front-End conf, Ex: http://127.0.0.1:5050
            methods: ['GET', 'POST'],
            credentials: true
        }));
    }

    public parseBody(): void {
        // Set Express File Upload
        this._app.use(upload());
        // Parse Body
        this._app.use(express.urlencoded({extended: false}));
        this._app.use(express.json());
    }

    public routes(): void {
        this._app.use( this._apiPath.user, user_router );
        this._app.use( this._apiPath.file, file_router );
    }

    public connectDB(): void {
        mongoose.connect( this._mongoURI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        } as ConnectOptions, ( err: mongoose.CallbackError ) => {
            if ( err ) {
                console.log(`\n[x] Couldn't connect to Database!\n`);
                return;
            }
            console.log(`\n[*] Database working!\n`);
        });
    }

    public listen(): void {
        this._app.listen( this._port, () => {
            console.log(`\n[*] Server is currently running on port ${ this._port }`);
        });
    }

}

export default Server;