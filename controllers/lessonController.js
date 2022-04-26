const lesson = require('../models/lesson.model')


exports.view = (req, res) =>{
    lesson.getAll((lessons)=>{
        res.json({lessons})
    })
}

exports.create = (req, res) =>{
    
}

exports.delete = (req, res) =>{

}
