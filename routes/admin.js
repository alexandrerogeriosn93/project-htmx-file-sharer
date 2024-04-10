const express = require("express");
const { User } = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", { title: "Admin", template: "admin" });
});

module.exports = router;
