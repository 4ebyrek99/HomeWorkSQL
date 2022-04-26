const jwt = require('jsonwebtoken');

module.exports = checkToken = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log(token);

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
            msg: "Токен авторизации не найден!"
        })
    }
}
