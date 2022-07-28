const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./output-api.json')

const routerAccount = require('./routes/account');
const routerHomework = require('./routes/homework');
const routerLesson = require('./routes/lesson')
const routerSchedule = require('./routes/schedule')
const routerExams = require('./routes/exams')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}));

app.use(routerAccount);
app.use(routerHomework);
app.use(routerLesson);
app.use(routerSchedule);
app.use(routerExams);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.listen(3000, ()=>{
    console.log("Сервер запущен!");
})