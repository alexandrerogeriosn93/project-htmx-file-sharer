const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { where } = require("sequelize");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("layout", { title: "Login", template: "login" });
});

router.get("/register", (req, res) => {
  res.render("layout", { title: "Registrar", template: "register" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.send("Preencha todos os dados!");
    return;
  }

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      res.setHeader("HX-Redirect", "/admin");
      res.send("Usuário logado.");
    } else {
      res.send("Falha no login: credenciais inválidas!");
    }
  } catch (error) {
    res.send("Erro ao autenticar usuário.");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.setHeader("HX-Redirect", "/");
    res.send("Logout efetuado!");
  });
});

module.exports = router;
