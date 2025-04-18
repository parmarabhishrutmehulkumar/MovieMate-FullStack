import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDb from './Controller/Db.js';
import bcrypt from 'bcrypt';
import userModel from './Models/User.js';
import router from './Routes/registerRoute.js'; 
import router1 from './Routes/loginRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();


connectToDb();
const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
};


app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/register', router);

app.use('/login', router1);

app.use('/api',router1)


import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post('/recommend', (req, res) => {
  const { movieName } = req.body;

  if (!movieName) {
    return res.status(400).json({ error: 'Movie name is required' });
  }

  // Construct full path to recommend.py
  const pythonScriptPath = path.join(__dirname, '..', 'ML', 'recommend.py');


  const python = spawn('python', [pythonScriptPath, movieName]);

  let result = '';
  let errorOutput = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  python.on('close', (code) => {
    console.log('Raw output from Python script:', result);
    console.log('Error output from Python script:', errorOutput);

    try {
      const recommendations = JSON.parse(result);
      res.json({ recommendations });
    } catch (e) {
      res.status(500).json({
        error: 'Failed to parse recommendations',
        rawOutput: result,
        stderr: errorOutput
      });
    }
  });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
