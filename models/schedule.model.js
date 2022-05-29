const db = require('./index')

const Schedule = db.sequelize.define("schedule", {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    lesson_name: {
        type: db.Sequelize.INTEGER,
        allowNull: false
      },
    time_start: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    time_end: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    classroom: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    type_lesson: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    zoom_id: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    zoom_pass: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    teacher: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    day: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
},{
    timestamps: false
});


module.exports.getAll = (callback) =>{

  Schedule.findAll({raw:true})
      .then(schedule=>{
        callback(schedule)
      })
      .catch(err=>{
          console.log(err)
      })
};


module.exports.getById = (id, callback) =>{
  Schedule.findOne({where: {id: id}})
  .then(result=>{
    callback(result)
  })
}

module.exports.editById = (data, callback) =>{
  Schedule.update({
    lesson_name: data.lesson_name,
    time_start: data.time_start,
    time_end: data.time_end,
    class_room: data.class_room,
    type_lesson: data.type_lesson,
    zoom_id: data.zoom_id,
    zoom_pass: data.zoom_pass,
    teacher: data.teacher,
    day: data.day
  },
  {
    where:{id: data.id}
  }).then(result=>{
    callback(result)
  })
}

module.exports.delete = (id, callback) =>{
  Schedule.destroy({where:{id: id}})
  .then(result=>{
    callback(result)
  })
  .catch(err=>{
    callback(err)
  })
}