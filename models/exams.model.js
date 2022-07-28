const db = require('./index')

const Exams = db.sequelize.define("exams", {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    lesson_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    date: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    time_start: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    teacher: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    author: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports.getAll = (callback) =>{

    Exams.findAll({raw:true})
        .then(exam=>{
          callback(exam)
        })
        .catch(err=>{
            console.log(err)
        })
};
module.exports.getById = (id, callback) =>{
    Exams.findOne({where: {id: id}})
    .then(result=>{
      callback(result)
    })
}

module.exports.editById = (data, callback) =>{
    Exams.update({
    lesson: data.lesson,
    date: data.date,
    time_start: data.time_start,
  },
  {
    where:{id: data.id}
  }).then(result=>{
    callback(result)
  })
}


module.exports.create = (item, callback) =>{
    Exams.create(item, {raw: true})
        .then(result=>{
            callback(result)
        })
}

module.exports.delete = (id, callback)=>{
    Exams.destroy({where:{id: id}})
    .then(result=>{
      callback(result)
    })
    .catch(err=>{
      callback(err)
    })
}