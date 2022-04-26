const homework = require('../models/homework.model')
const lesson = require('../models/lesson.model')
const user = require('../models/user.model')


exports.view = (req, res) =>{

    //Готовый код
    let lessonId = null
    let userId = null

    lesson.getAll((lessons=>{
        user.getAll((users)=>{
            homework.getAll((homeworks)=>{
                for(i = 1; i <= homeworks.length; i++){
                    lessonId = homeworks[i-1].lesson
                    userId = homeworks[i-1].author
                    
                    homeworks[i-1].lesson = lessons[lessonId-1].name
                    homeworks[i-1].author = users[userId-1].name
                }
            
                res.json({
                    homeworks: homeworks
                })
            })
        })
    }))
    
    
}

exports.create = (req, res) =>{

    homeworkItem = {
        title: req.body.title,
        description: req.body.description,
        expireDate: req.body.expireDate,
        author: req.body.author,
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
        title: req.body.title,
        description: req.body.description
    }
    homework.editById(data, (result)=>{
        if(result > 0){
            res.json({
                success: true,
                msg: "ДЗ было изменено!"
            })
        }
        else{
            res.json({
                success: false,
                msg: "ДЗ не было изменено!"
            })
        }
    })
}

exports.filter = (req, res) =>{
    const id = req.params.id

    lesson.getAll((lessons=>{
        user.getAll((users)=>{
            homework.filterByLesson(id, (homeworks)=>{
                for(i = 1; i <= homeworks.length; i++){
                    lessonId = homeworks[i-1].lesson
                    userId = homeworks[i-1].author
                    
                    homeworks[i-1].lesson = lessons[lessonId-1].name
                    homeworks[i-1].author = users[userId-1].name
                }
                res.json({
                    homeworks: homeworks
                })
            })
        })
    }))
}

exports.delete = (req, res) =>{
    const id = req.params.id

    homework.delete(id, (result)=>{
        if(result !== 0){

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
                result: result,
                msg: "Домашнее задание удалено"
            })
        }
        else{
            res.json({
                success: false,
                result: result,
                msg: "Домашнего задания с таким id не найдено"
            })
        }
    })
}