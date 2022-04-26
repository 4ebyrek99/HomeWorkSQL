const db = require('./index')

const Lesson = db.sequelize.define("lesson", {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
      },
    count: {
        type: db.Sequelize.INTEGER,
        allowNull: false
      }
},{
    timestamps: false
});

module.exports.getAll = (callback)=>{
  Lesson.findAll({raw:true})
      .then(lessons=>{
        callback(lessons)
      })
      .catch(err=>{
        console.log(err)
    })
}

module.exports.getById = (id, callback) =>{
  Lesson.findOne({where: {id: id}})
    .then(result=>{
      callback(result)
    })
}

module.exports.create = (item, callback) =>{
  Lesson.create(item, {raw: true})
  .then(result=>{
      callback(result)
  })
}

module.exports.delete = (id, callback) =>{
  Lesson.destroy({where: {id: id}})
    .then(result=>{
      callback(result)
    })
    .catch(err=>{
      callback(err)
    })
}

module.exports.counter = (data) => {
  Lesson.update({
    count: data.count
  },
  {
    where:{id: data.id}
  })

}