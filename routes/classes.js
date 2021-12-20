const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:class");
const { Class, EducationUnit, Student, Teacher } = require("../models/schema");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug(`List classes [user ${req.user.username}]`);
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const classes = await Class.findAll({
        include: [EducationUnit, Teacher],
      });
      res.json(classes);
    } else {
      res.sendStatus(403);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    const classId = req.params.id;
    debug(`Details from class ${classId} [user ${req.user.username}]`);
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const classInfo = await Class.findByPk(classId, {
        include: ["teacher", "educationUnit"],
      });
      res.json(classInfo);
    } else {
      res.sendStatus(403);
    }
  }
);

router.get(
  "/:id/students",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    const classId = req.params.id;
    debug(`List students from class ${classId} [user ${req.user.username}]`);
    const roles = await req.user.getRoles();
    if (roles.find((role) => role.name === "admin")) {
      const limit = parseInt(req.query.limit);
      const offset = parseInt(req.query.offset);
      const students = await Student.findAndCountAll({
        include: [
          {
            model: Class,
            where: {
              id: classId,
            },
          },
        ],
        limit: limit,
        offset: offset,
      });

      res.json(students);
    } else {
      res.sendStatus(403);
    }
  }
);

module.exports = router;
