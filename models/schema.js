const Class = require("./class");
const EducationUnit = require("./education_unit");
const Role = require("./role");
const Student = require("./student");
const Teacher = require("./teacher");
const TeachingPeriod = require("./teaching_period");
const User = require("./user");

Teacher.hasMany(Class);
Class.belongsTo(Teacher);

EducationUnit.hasMany(Class);
Class.belongsTo(EducationUnit);

Class.hasMany(TeachingPeriod);
TeachingPeriod.belongsTo(Class);

Class.belongsToMany(Student, { through: "students_classes" });
Student.belongsToMany(Class, { through: "students_classes" });

User.belongsToMany(Role, { through: "user_roles" });
Role.belongsToMany(User, { through: "user_roles" });

module.exports = {
  Class,
  EducationUnit,
  Role,
  Student,
  Teacher,
  TeachingPeriod,
  User,
};
