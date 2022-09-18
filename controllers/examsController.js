const lesson = require('../models/lesson.model')
const user = require('../models/user.model')
const exams = require('../models/exams.model')
const jwt = require('jsonwebtoken');

exports.view = (req, res) =>{
    lesson.getAll(lessons=>{
        user.getAll((users)=>{
            exams.getAll((examss)=>{
                for(i = 1; i <= examss.length; i++){
                    for(j = 1; j <= lessons.length; j++){
                        if(examss[i-1].lesson_name === lessons[j-1].id){
                            examss[i-1].lesson_name = lessons[j-1].name
                        }
                    }
                    for(j = 1; j <= users.length; j++){
                        if(examss[i-1].author === users[j-1].id){
                            examss[i-1].author = users[j-1].name
                        }
                    }
                }
                if(examss){
                    res.json({
                        success: true,
                        examss: examss
                    })
                }else{
                    res.json({
                        success: false,
                        msg: "Экзамены не найдены!"
                    })
                }
            })
        })
    })
}

exports.create = (req, res) =>{

    token = jwt.decode(req.cookies.jwt)

    examsItem = {
        lesson_name: req.body.lesson_name,
        date: req.body.date,
        time_start: req.body.time_start,
        teacher: req.body.teacher,
        author: token.id,
    }

    exams.create(examsItem, (result)=>{
        if(result){
            res.json({
                success: true,
                data: result
            })
        }else{
            res.json({
                success: false,
                msg: "Ошибка при создании экзамена!"
            })
        }
    })
}

exports.get = (req, res) =>{
    const id = req.params.id
    exams.getById(id, (exam) =>{
        if(exam !== null){
            user.getUserById(exam.author, (author)=>{
                exam.lesson = lesson.name
                exam.author = author.name
                res.json({exam})
            })
        }else{
            res.json({
                success: false,
                msg: "Этот экзамен не найден!"
            })
        }
    })
}

exports.edit = (req, res) =>{
    const data ={
        id: req.body.id,
        lesson_name: req.body.lesson_name,
        date: req.body.date,
        time_start: req.body.time_start
    }

    exams.editById(data, (result)=>{
        if(result > 0){
            res.json({
                success: true,
                msg: "Экзамен был изменен!"
            })
        }else{
            res.json({
                success: false,
                msg: "Экзамен не был изменен!"
            })
        }
    })
}

exports.delete = (req, res) =>{
    const id = req.params.id
    exams.delete(id, (result)=>{
        if(result){
            res.json({
                success: true,
                msg: "Экзамен удален!"
            })
        }else{
            res.json({
                success: false,
                msg: "Экзамен с таким id не найден!"
            })
        }
    })
}