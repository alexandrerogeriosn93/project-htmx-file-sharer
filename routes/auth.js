const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("layout", { title: "Login", template: "login" });
});

router.get("/register", (req, res) => {
  res.render("layout", { title: "Registrar", template: "register" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ name, email, password: hashPassword });

    req.session.userId = newUser.id;
    res.setHeader("HX-Redirect", "/admin");
    res.send("Usuário registrado.");
  } catch (error) {
    res.send("Erro ao registrar usuário.");
  }
});

module.exports = router;
