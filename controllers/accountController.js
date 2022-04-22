const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.login = (req, res) =>{

    const login = req.body.login
    const password = req.body.password

    User.getUserByLogin(login, (find)=>{
        if(find){
            dataToken = {
                id: find.id,
                login: find.login,
                name:find.name,
            }
            User.comparePass(password, find.password, (isAuth)=>{
                if(isAuth){
                    const token = jwt.sign(dataToken, process.env.SECRET_KEY, {
                        expiresIn: 3600 * 12
                    });
                    res
                    .json({
                        success: true,
                        msg:"Успешная авторизация",
                        jwt: token
                    })
                }else{
                    return res.json({
                        success: false, 
                        msg: "Пароль не совпадает!"
                    })
                }
            })
        }
        else{
            return res.json({
                success: false, 
                msg: "Пользователь не найден!"
            })
        }
    })
}

exports.reg = (req, res) =>{

    let newUser = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    }

    User.getUserByLogin(newUser.login, (find)=>{
        if(!find){
            User.addUser(newUser, (user)=>{
                if(!user){
                    res.json({
                        success: false,
                        msg: "Пользователь не был зарегистрирован!"
                    })
                }else{
                    dataToken = {
                        id: user.id,
                        login: user.login,
                        name:  user.name,
                    }
                    const token = jwt.sign(dataToken, process.env.SECRET_KEY, {
                        expiresIn: 3600 * 12
                    });

                    res.json({
                        success: true,
                        msg: "Пользователь был зарегистрирован!",
                        data:{
                            name: user.name,
                            login: user.login,
                            jwt: token
                        }
                    })
                }
            })
        }
        else{
            res.json({
                success:false,
                msg:"Такой логин уже используется!"
            })
        }
    })
}

exports.change = (req, res) =>{

    const oldLogin = req.body.login
    const newLogin = req.body.newLogin

    User.getUserByLogin(oldLogin, (find)=>{
        if(find){
            User.changeLogin(find.login, newLogin, (changed) =>{
                if(changed){
                    res.json({
                        success:true,
                        msg:"Логин успешно изменен!"
                    })
                }
            })
        }else{
            res.json({
                success:false, 
                msg:"Такой логин не найден!"
            })
        }
    })


}

exports.deleteUser = (req, res) =>{

    const login = req.body.login

    User.getUserByLogin(login, (find)=>{
        if(find){
            User.deleteUser(login, (deleted)=>{
                if(deleted){
                    res.json({
                        success:true,
                        msg:"Пользователь удален!"
                    })
                }
                else{
                    res.json({
                        success:false,
                        msg:"Ошибка удаления!"
                    })
                }
            })
        }
        else{
            res.json({
                success:false,
                msg:"Такой логин не найден!"
            })
        }

    })
}