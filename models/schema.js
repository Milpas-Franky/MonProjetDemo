const Student = require("./student");
const Teacher = require("./teacher");
const Class = require("./class");
const EducationUnit = require("./education_unit");
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

module.exports = {
  Class,
  EducationUnit,
  Student,
  Teacher,
  TeachingPeriod,
  User,
};
