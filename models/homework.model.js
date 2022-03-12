const db = require('../models/index')


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

module.exports.getById = (id, callback)=>{
    Homework.findAll({where:{lesson: id}, raw: true})
      .then(result=>{
        callback(result)
      })
}

module.exports.createHomework = (item, callback) =>{
    Homework.create(item, {raw: true})
        .then(result=>{
            callback(result)
        })
}

