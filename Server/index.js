import express from 'express';
import dotenv from 'dotenv';

import Database from './config/dbConn.js'
import { addAdmin, adminLogin } from './controller/admin.controller.js';
import sendToken from './middleware/sendToken.js';
import verifyToken from './middleware/verifyToken.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
// Connecting to Database
// adding api key and some confg
const db = new Database(process.env.MONGODB_URI_WITH_DB);

// connect to database
db.connect().catch((err) =>
  console.error("Error connecting to database:", err)
);

app.use(express.json());

app.post('/account/signup', addAdmin, sendToken);

app.post('/account/login', adminLogin, sendToken)

app.post('/verify', verifyToken, (req, res) => {
  res.send("<h1>Hello world<h1>");
})
// server running check
app.get('/server-running', (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});



app.listen(PORT, () => `Server running at ${PORT}`);