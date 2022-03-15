const homework = require('../models/homework.model')
const lesson = require('../models/lesson.model')
const user = require('../models/user.model')


exports.view = (req, res) =>{


    homework.getAll((homeworks)=>{
        console.log(homeworks);
    })


    //Готовый код
    // let lessonId = null
    // let userId = null

    // lesson.getAll((lessons=>{
    //     user.getAll((users)=>{
    //         homework.getAll((homeworks)=>{
    //             for(i = 1; i <= homeworks.length; i++){
    //                 lessonId = homeworks[i-1].lesson
    //                 userId = homeworks[i-1].author
                    
    //                 homeworks[i-1].lesson = lessons[lessonId-1].name
    //                 homeworks[i-1].author = users[userId-1].name
    //             }
            
    //             res.json({
    //                 lessons: lessons,
    //                 homeworks: homeworks
    //             })
    //         })
    //     })
    // }))
    
    
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
