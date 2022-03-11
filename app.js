const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routerAccount = require('./routes/account');


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', routerAccount);

app.listen(3000, ()=>{
    console.log("Сервер запущен!");
})