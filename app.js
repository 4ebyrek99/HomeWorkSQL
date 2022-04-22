const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config()

const routerAccount = require('./routes/account');
const routerHomework = require('./routes/homework');
const routerLesson = require('./routes/lesson')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}));

app.use('/account', routerAccount);
app.use('/homework', routerHomework);
app.use('/lessons', routerLesson);


app.listen(3000, ()=>{
    console.log("Сервер запущен!");
})