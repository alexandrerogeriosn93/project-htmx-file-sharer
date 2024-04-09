const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("layout", { title: "Home", template: "index" });
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
