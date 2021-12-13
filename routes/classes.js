const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:class");
const { Class, EducationUnit, Student, Teacher } = require("../models/schema");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    debug("List classes");
    const classes = await Class.findAll({
      include: [EducationUnit, Teacher],
    });
    res.json(classes);
  }
);

module.exports = router;
