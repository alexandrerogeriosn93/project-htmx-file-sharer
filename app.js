const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const app = express();
const port = 3000;

app.use(
  session({
    store: new SQLiteStore(),
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, res, next) => {
  if (req.session) {
    res.locals.session = req.session;
  }

  next();
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.get("/", (req, res) => {
  res.render("layout", { title: "Home", template: "index" });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
