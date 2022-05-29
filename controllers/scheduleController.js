const lesson = require('../models/lesson.model')
const schedule = require('../models/schedule.model')

exports.view = (req, res) =>{

    //Готовый код
    lesson.getAll(lessons=>{
        schedule.getAll((schedules)=>{
            for(i = 1; i <= schedules.length; i++){
                for(j = 1; j <= lessons.length; j++){
                    if(schedules[i-1].lesson_name === lessons[j-1].id){
                        schedules[i-1].lesson_name = lessons[j-1].name
                    }
                }  
            }
            if(schedules){
                res.json({
                    success: true,
                    schedule: schedules
                })
            }else{
                res.json({
                    success: false,
                    msg: "Расписание не найдено!"
                })
            }
        })
    })
    
}

exports.create = (req, res) =>{
    const scheduleItem = {
        lesson_name: req.body.lesson,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        classroom: req.body.classroom,
        type_lesson: req.body.type_lesson,
        zoom_id: req.body.zoom_id,
        zoom_pass: req.body.zoom_pass,
        teacher: req.body.teacher,
        day: req.body.day
    }

    schedule.create(scheduleItem, (result)=>{
        if(result){
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
    schedule.getById(id, (schedule)=>{
        if(schedule !== null){
            lesson.getById(schedule.lesson_name, (lesson)=>{
                schedule.lesson_name = lesson.name
                res.json({
                    success: true,
                    schedule: schedule
                })
            })
        }else{
            res.json({
                success: false,
                msg: "Это расписание не найдено!"
            })
        }
    })
}


exports.edit = (req, res) =>{
    const data = {
        id: req.body.id,
        lesson_name: req.body.lesson,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        class_room: req.body.classroom,
        type_lesson: req.body.type_lesson,
        zoom_id: req.body.zoom_id,
        zoom_pass: req.body.zoom_pass,
        teacher: req.body.teacher,
        day: req.body.day
    }

    schedule.editById(data, (result)=>{
        if(result > 0){
            res.json({
                success: true,
                msg: "Расписание было изменено!"
            })
        }else{
            res.json({
                success: true,
                msg: "Расписание не было изменено!"
            })
        }
    })

}

exports.delete = (req, res) =>{
    const id = req.params.id

    schedule.delete(id, (result) =>{
        if(result !== 0){
            res.json({
                success: true,
                result: result,
                msg: "Расписание удалено!"
            })
        }else[
            res.json({
                success: false,
                result: result,
                msg: "Расписание с таким id не найдено!"
            })
        ]
    })
}