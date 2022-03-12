const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routerAccount = require('./routes/account');
const routerHomework = require('./routes/homework');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', routerAccount);
app.use('/homework', routerHomework);

app.listen(3000, ()=>{
    console.log("Сервер запущен!");
})