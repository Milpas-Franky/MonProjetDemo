require("dotenv").config();
const debug = require("debug")("monprojetdemo:schema");
const sequelize = require("./connection");
const {
  Class,
  EducationUnit,
  Role,
  Student,
  Teacher,
  TeachingPeriod,
  User,
} = require("./schema");
const { hash } = require("../password_hash");

(async () => {
  debug("Recreating tables...");
  await sequelize.sync({ force: true });

  debug("Importing samples...");

  const thierno = await Student.create({
    firstName: "Thierno",
    lastName: "Barry",
  });
  const nadege = await Student.create({
    firstName: "Nadège",
    lastName: "Mukashema",
  });
  const michael = await Student.create({
    firstName: "Michael",
    lastName: "Abou-Zeid",
  });
  const jonathan = await Student.create({
    firstName: "Jonathan",
    lastName: "Degrave",
  });
  const hatim = await Student.create({
    firstName: "Hatim",
    lastName: "Naimi",
  });
  const carole = await Student.create({
    firstName: "Carole",
    lastName: "Guedem Noumbissie",
  });

  const mrsSonneville = await Teacher.create({
    firstName: "Véronique",
    lastName: "Sonneville",
  });
  const mrsDesmarets = await Teacher.create({
    firstName: "Karin",
    lastName: "Desmarets",
  });
  const mrRoland = await Teacher.create({
    firstName: "François",
    lastName: "Roland",
  });

  const adgesec = await EducationUnit.create({
    name: "Administration, gestion et sécurisation des réseaux",
  });
  const psgbd = await EducationUnit.create({
    name: "Projet SGBD",
  });
  const projint = await EducationUnit.create({
    name: "Projet d'intégration de développement",
  });
  const projweb = await EducationUnit.create({
    name: "Projet de développement Web",
  });

  const psgbd_s1_2122 = await Class.create({
    shortName: "PSGBD_S1_2122",
    academicYear: "2021-2022",
  });
  const projweb2_s1_2021 = await Class.create({
    shortName: "PROJWEB2_S1_2021",
    academicYear: "2020-2021",
  });
  const projweb2_s1_2122 = await Class.create({
    shortName: "PROJWEB2_S1_2122",
    academicYear: "2021-2022",
  });
  const projint_s1_2122 = await Class.create({
    shortName: "PROJINT_S1_2122",
    academicYear: "2021-2022",
  });

  const p20200907_am = await TeachingPeriod.create({
    date: "2020-09-07",
    beginning: "09:00",
    end: "12:40",
  });
  const p20200914_am = await TeachingPeriod.create({
    date: "2020-09-14",
    beginning: "09:00",
    end: "12:40",
  });
  const p20200921_am = await TeachingPeriod.create({
    date: "2020-09-21",
    beginning: "09:00",
    end: "12:40",
  });
  const p20200928_am = await TeachingPeriod.create({
    date: "2020-09-28",
    beginning: "09:00",
    end: "12:40",
  });
  const p20211129_am = await TeachingPeriod.create({
    date: "2021-11-29",
    beginning: "09:00",
    end: "12:40",
  });
  const p20211206_am = await TeachingPeriod.create({
    date: "2021-12-06",
    beginning: "09:00",
    end: "12:40",
  });
  const p20211213_am = await TeachingPeriod.create({
    date: "2021-12-13",
    beginning: "09:00",
    end: "12:40",
  });
  const p20211129_pm = await TeachingPeriod.create({
    date: "2021-11-29",
    beginning: "13:20",
    end: "16:50",
  });
  const p20211206_pm = await TeachingPeriod.create({
    date: "2021-12-06",
    beginning: "13:20",
    end: "16:50",
  });
  const p20211213_pm = await TeachingPeriod.create({
    date: "2021-12-13",
    beginning: "13:20",
    end: "16:50",
  });

  await psgbd_s1_2122.setTeacher(mrsSonneville);
  await projweb2_s1_2021.setTeacher(mrRoland);
  await projweb2_s1_2122.setTeacher(mrRoland);
  await projint_s1_2122.setTeacher(mrRoland);

  await psgbd_s1_2122.setEducationUnit(psgbd);
  await projweb2_s1_2021.setEducationUnit(projweb);
  await projweb2_s1_2122.setEducationUnit(projweb);
  await projint_s1_2122.setEducationUnit(projint);

  await projweb2_s1_2021.addTeachingPeriods([
    p20200907_am,
    p20200914_am,
    p20200921_am,
    p20200928_am,
  ]);
  await projweb2_s1_2122.addTeachingPeriods([
    p20211129_am,
    p20211206_am,
    p20211213_am,
  ]);
  await projint_s1_2122.addTeachingPeriods([
    p20211129_pm,
    p20211206_pm,
    p20211213_pm,
  ]);

  await projweb2_s1_2021.addStudents([carole, hatim]);
  await projweb2_s1_2122.addStudents([nadege, michael, jonathan]);
  await projint_s1_2122.addStudents([carole, hatim, thierno]);

  const user = await Role.create({
    name: "user",
  });

  const admin = await Role.create({
    name: "admin",
  });

  const admin_user = await User.create({
    username: "admin_user",
    password: await hash("password"),
  });

  await admin_user.addRoles([user, admin]);

  const plain_user = await User.create({
    username: "plain_user",
    password: await hash("password"),
  });

  await plain_user.addRoles([user]);

  debug("Samples imported.");

  await sequelize.close();
})();
