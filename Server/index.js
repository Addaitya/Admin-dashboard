import express from 'express';
import Database from './config/dbConn.js'
import addAdmin from './controller/admin.controller.js';
import dotenv from 'dotenv';

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

await addAdmin();

// server running check
app.get('/server-running', (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});



app.listen(PORT, () => `Server running at ${PORT}`);