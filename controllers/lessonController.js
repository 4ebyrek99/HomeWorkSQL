const lesson = require('../models/lesson.model')


exports.view = (req, res) =>{
    lesson.getAll((lessons)=>{
        res.json({lessons})
    })
}

exports.create = (req, res) =>{
    lessonItem = {
        name: req.body.name,
        count: 0
    }
    
    lesson.create(lessonItem, (result)=>{
        if(result){
            res.json({
                success: true,
                msg: "Предмет добавлен!"
            })
        }else{
            res.json({
                success: false,
                msg: "Ошибка добавления!"
            })
        }
    })
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

exports.edit = (req, res) =>{
    const data = {
        id: req.body.id,
        name: req.body.name,
    }

    lesson.edit(data, (result)=>{
        if(result > 0){
            res.json({
                success: true,
                msg: "Предмет изменен!"
            })
        }
        else{
            res.json({
                success: false,
                msg: "Предмет с таким id не найден!"
            })
        }
    })
}