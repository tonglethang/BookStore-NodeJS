import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';

import mainRoutes from './server/Routes/Main.js';
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up mongoose
const DB_URL = "mongodb://localhost:27017/BookStore";
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up port
const port = 5035;
// set up route

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
app.set('view engine', 'ejs');
app.use('/', mainRoutes);