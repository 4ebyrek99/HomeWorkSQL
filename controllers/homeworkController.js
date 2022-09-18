const homework = require('../models/homework.model')
const lesson = require('../models/lesson.model')
const user = require('../models/user.model')
const jwt = require('jsonwebtoken');

exports.view = (req, res) =>{

    //Готовый код
    

    lesson.getAll(lessons=>{
        user.getAll((users)=>{
            homework.getAll((homeworks)=>{
                for(i = 1; i <= homeworks.length; i++){
                    for(j = 1; j <= lessons.length; j++){
                        if(homeworks[i-1].lesson === lessons[j-1].id){
                            homeworks[i-1].lesson = lessons[j-1].name
                        }
                    }
                    for(j = 1; j <= users.length; j++){
                        if(homeworks[i-1].author === users[j-1].id){
                            homeworks[i-1].author = users[j-1].name
                        }
                    }
                }
                if(homeworks){
                    res.json({
                        success: true,
                        homeworks: homeworks
                    })
                }else{
                    res.json({
                        success: false,
                        msg: "ДЗ не найдено!"
                    })
                }
            })
        })
    })
    
    
}

exports.create = (req, res) =>{

    token = jwt.decode(req.cookies.jwt)

    homeworkItem = {
        title: req.body.title,
        description: req.body.description,
        expireDate: req.body.expireDate,
        author: token.id,
        lesson: req.body.lesson
    }

    const date = new Date()

    function formatDate(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
    
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        
        var yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        
        return dd + '-' + mm + '-' + yy;
    }

    homeworkItem.createDate = formatDate(date)

    homework.create(homeworkItem, (result)=>{
        if(result){
            homework.filterByLesson(homeworkItem.lesson, (homework)=>{
                if(homework){
                    const data = {
                        id: homeworkItem.lesson,
                        count: homework.length
                    }
                    console.log(data);
                    lesson.counter(data)
                }
            })

            res.json({
                success: true,
                data: result
            })
        }else{
            res.json({
                success: false,
                msg: "Ошибка при создании ДЗ!"
            })
        }
    })
}

exports.get = (req, res) =>{
    const id = req.params.id
    homework.getById(id, (homework)=>{
        if(homework !== null){
            lesson.getById(homework.lesson, (lesson)=>{
                user.getUserById(homework.author, (author)=>{
                    homework.lesson = lesson.name
                    homework.author = author.name
                    res.json({homework})
                })
            })
        }else{
            res.json({
                success: false,
                msg: "Это ДЗ не найдено!"
            })
        }
    })
}

exports.edit = (req, res) =>{
    const data = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    }
    homework.editById(data, (result)=>{
        if(result > 0){
            res.json({
                success: true,
                msg: "ДЗ было изменено!"
            })
        }else{
            res.json({
                success: false,
                msg: "ДЗ не было изменено!"
            })
        }
    })
}

exports.filter = (req, res) =>{
    const id = req.params.id

    lesson.getAll(lessons=>{
        user.getAll((users)=>{
            homework.filterByLesson(id, (homeworks)=>{
                for(i = 1; i <= homeworks.length; i++){
                    for(j = 1; j <= lessons.length; j++){
                        if(homeworks[i-1].lesson === lessons[j-1].id){
                            homeworks[i-1].lesson = lessons[j-1].name
                        }
                    }
                    for(j = 1; j <= users.length; j++){
                        if(homeworks[i-1].author === users[j-1].id){
                            homeworks[i-1].author = users[j-1].name
                        }
                    }
                }
                if(homeworks){
                    res.json({
                        success: true,
                        homeworks: homeworks
                    })
                }else{
                    res.json({
                        success: false,
                        msg: "ДЗ не найдено!"
                    })
                }

            })
        })
    })
}

exports.delete = (req, res) =>{
    const id = req.params.id



    homework.delete(id, (result)=>{
        console.log(result);
        if(result){
            //переделать счетчик
            // homework.filterByLesson(homeworkItem.lesson, (homework)=>{
            //     if(homework){
            //         const data = {
            //             id: homeworkItem.lesson,
            //             count: homework.length
            //         }
            //         console.log(data);
            //         lesson.counter(data)
            //     }
            // })

            res.json({
                success: true,
                msg: "Домашнее задание удалено!"
            })
        }else{
            res.json({
                success: false,
                msg: "Домашнего задания с таким id не найдено!"
            })
        }
    })
}