const swaggerGenerator = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Homework server API',
        description: 'API сервера с ДЗ"',
        host: 'localhost:3000',
        schemes: ['http']
    },
    host: "localhost:3000",
    basePath: ""
}

const outputFile = './output-api.json'
const endPoints = [
    './routes/homework.js',
    './routes/lesson.js',
    './routes/account.js',
]

swaggerGenerator(outputFile, endPoints, doc)
