// Dotenv Configuration
import dotenv from 'dotenv';
dotenv.config();

// Static Files
import Server from './models/Server';

// Instance the main class
const server: Server = new Server( process.env.PORT || '8080', process.env.MONGO_URI || '' );

// Config Cors
server.confCors();

// Parse Body
server.parseBody();

// Routes
server.routes();

// Connect to Mongo
server.connectDB();

// Run Server
server.listen();