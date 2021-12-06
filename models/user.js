const debug = require("debug")("monprojetdemo:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining User model...");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: connection, modelName: "user" }
);

debug("User model defined.");

module.exports = User;
