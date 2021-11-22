const { sequelize, DataTypes, Model } = require('sequelize');  

const sequelize = new sequelize('studentb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
}); 

class students extends Model {}

students.init({
   firstname: {
       type: DataTypes.STRING, 
       allowNull: false
   },
   lastname: {
       type: DataTypes.STRING,
       allowNull: false 
   }
}, { sequelize, modelName: "student" });

module.exports = { sequelize, Student };

