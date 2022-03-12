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
      }
},{
    timestamps: false
});
