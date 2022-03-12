const db = require('../models/index')
const bcrypt     = require('bcrypt');

const User = db.sequelize.define("user", {
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
    login: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false
    }
},{
    timestamps: false
});

module.exports.getAll = (callback) =>{
    User.findAll({raw:true})
        .then(users=>{
            callback(users)
        })
        .catch(err=>{
            console.log(err)
        })
};

module.exports.getUserByLogin = function(login, callback){
    User.findOne({where:{login: login}, raw: true })
    .then(user=>{
        callback(user)
    })
    .catch(err=>{
        console.log(err)
    })
};

module.exports.getUserById = function(id, callback){
    
};

module.exports.addUser = (newUser, callback) =>{

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(!err){
                newUser.password = hash;
                User.create(newUser, {raw: true})
                    .then(user=>{
                        callback(user)
                    })
                    .catch(err=>{
                        callback(err)
                    });
            }
            else{
                console.log(err);
            }
        });
    });

    
}

module.exports.changeLogin = (oldLogin, newLogin, callback) =>{
    
    User.update({ login: newLogin }, {where: {login: oldLogin}})
        .then(changed=> {
            changed = true
            callback(changed)
        })
}

module.exports.deleteUser = (login, callback) =>{
    User.destroy({where:{login: login}})
        .then(deleted=>{
            deleted = true
            callback(deleted)
        })
}

module.exports.comparePass = function(passFormUser, passFromDB, callback){

    bcrypt.compare(passFormUser, passFromDB, (err, isAuth)=>{
        callback(isAuth)
    });
};

