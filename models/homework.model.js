const db = require('./index')


const Homework = db.sequelize.define("homeworks", {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
      },
    description: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    createDate: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    expireDate: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    author: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    lesson: {
      type: db.Sequelize.STRING,
      allowNull: false
  },
},{
    timestamps: false
});


module.exports.getAll = (callback) =>{

    Homework.findAll({raw:true})
        .then(homeworks=>{
          callback(homeworks)
        })
        .catch(err=>{
            console.log(err)
        })
};
module.exports.getById = (id, callback) =>{
  Homework.findOne({where: {id: id}})
    .then(result=>{
      callback(result)
    })
}

module.exports.editById = (data, callback) =>{
  Homework.update({
    title: data.title,
    description: data.description,
  },
  {
    where:{id: data.id}
  }).then(result=>{
    callback(result)
  })
}

module.exports.filterByLesson = (id, callback) =>{
  Homework.findAll({where:{lesson: id}, raw: true })
    .then(result=>{
      callback(result)
    })
}

module.exports.create = (item, callback) =>{
    Homework.create(item, {raw: true})
        .then(result=>{
            callback(result)
        })
}

module.exports.delete = (id, callback)=>{
  Homework.destroy({where:{id: id}})
    .then(result=>{
      callback(result)
    })
    .catch(err=>{
      callback(err)
    })
}

