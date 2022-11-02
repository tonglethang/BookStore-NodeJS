import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path  from 'path';
import mainRoutes from './server/Routes/Main.js';
import session from 'express-session';
import flash from 'connect-flash';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_URL = "mongodb://localhost:27017/BookStore";
const app = express();
const port = 5035;
const dir = path.join(__dirname, 'public/uploads');
// set up dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up mongoose
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up port
// set up route

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
app.use(express.static('public'));
app.use('/uploads',express.static(dir));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'pages/User')]);
app.set('view engine', 'ejs');
app.use(
  session({
      name: 'SESSION_ID',      // cookie name stored in the web browser
      secret: 'my_secret', 
      resave: true,
      saveUninitialized: true,    // helps to protect session
      cookie: {
          maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session is stored 30 days
      }
  })
);
app.use(flash());
app.use('/', mainRoutes);