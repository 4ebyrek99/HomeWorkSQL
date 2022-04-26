const swaggerGenerator = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Homework server API',
        description: 'API сервера с ДЗ"',
        host: 'homework.webdev.kz',
        schemes: ['https']
    },
    host: "homework.webdev.kz",
    schemes: ['https']
}

const outputFile = './output-api.json'
const endPoints = [
    './routes/homework.js',
    './routes/lesson.js',
    './routes/account.js',
]

swaggerGenerator(outputFile, endPoints, doc)
