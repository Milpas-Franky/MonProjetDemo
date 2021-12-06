const express = require("express");
const router = express.Router();
const debug = require("debug")("monprojetdemo:api:student");
const { User } = require("../models/schema");
const { verify } = require("../password_hash");
const { generate } = require("../jwt_generator");

router.post("/generate", async function (req, res, next) {
  debug("Generate token");
  const username = req.body.username;
  const passwordToVerify = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (user != null && await verify(user.password, passwordToVerify)) {
    res.json(generate(user.id, user.username));
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
