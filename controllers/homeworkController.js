const homework = require('../models/homework.model');

exports.view = (req, res) =>{
    homework.getAll((homeworks)=>{
        res.json({
            homeworks: homeworks
        })
    })
}

exports.viewByLesson = (req, res) =>{
    const id = req.params.id

    homework.getById(id, (result)=>{
        if(result){
            res.json({
                success: true,
                data: result
            })
        }
    })
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

    homework.createHomework(homeworkItem, (result)=>{
        if(result){
            if(result){
                res.json({
                    success: true,
                    data: result
                })
            }
        }
    })
    
}