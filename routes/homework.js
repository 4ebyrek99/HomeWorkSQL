const express = require('express');
const routerHomework  = express.Router();
const homework_controller = require('../controllers/homeworkController');
const jwt = require('jsonwebtoken');


const checkToken = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token !== undefined){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if(err){
                res.json({
                    success: false,
                    msg: "Вы не вошли в аккаунт!"
                })
            }else{
                next()
            }
        })
    }else{
        res.json({
            success: false,
            msg: "Вы не вошли в аккаунт!"
        })
    }
}


routerHomework.get('/', homework_controller.view);

routerHomework.post('/create', checkToken, homework_controller.create);

routerHomework.get('filter/:id', checkToken, homework_controller.filter);

routerHomework.get('/get/:id', checkToken, homework_controller.get);

routerHomework.put('/edit', checkToken, homework_controller.edit);

routerHomework.delete('/delete/:id', checkToken, homework_controller.delete);

module.exports = routerHomework;