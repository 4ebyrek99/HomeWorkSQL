const lesson = require('../models/lesson.model')


exports.view = (req, res) =>{
    lesson.getAll((lessons)=>{
        res.json({lessons})
    })
}

exports.create = (req, res) =>{
    
}

exports.delete = (req, res) =>{
    const id = req.params.id

    lesson.delete(id, (result)=>{
        if(result !== 0){
            res.json({
                success: true,
                result: result,
                msg: "Предмет удален!"
            })
        }
        else{
            res.json({
                success: false,
                result: result,
                msg: "Предмет с таким id не найден!"
            })
        }
    })
}
