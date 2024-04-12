const express = require("express");
const upload = require("../config/multerConfig");
const { User } = require("../models");
const { File } = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");
const { where } = require("sequelize");
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("layout", { title: "Admin", template: "admin" });
});

router.get("/all-files", isAuthenticated, (req, res) => {
  res.render("layout", {
    title: "Biblioteca de arquivos",
    template: "allfiles",
    userId: req.session.userId,
    files: [],
  });
});

router.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    const { name, description } = req.body;
    const userId = req.session.userId;

    if (!name || !req.file) {
      res.status(422).send("Preencha todos os campos!");
      return;
    }

    const path = req.file.path;

    try {
      await File.create({ name, description, path, userId });
      const userFiles = await File.findAll({
        where: { userId: req.session.userId },
      });

      res.render("partials/userFiles", { files: userFiles });
    } catch (error) {
      res.status(500).send("Erro ao criar arquivo!");
    }
  },
);

router.get("/fetch-files", isAuthenticated, async (req, res) => {
  const userFiles = await File.findAll({
    where: { userId: req.session.userId },
  });
  res.render("partials/userFiles", { files: userFiles });
});

router.delete("/delete-file/:fileId", isAuthenticated, async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).send("Arquivo não encontrado!");
    }

    await file.destroy();

    const userFiles = await File.findAll({
      where: { userId: req.session.userId },
    });

    res.render("partials/userFiles", { files: userFiles });
  } catch (error) {}
});

module.exports = router;
