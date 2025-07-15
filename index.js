import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/auth", (req, res) => {
  res.render("auth.ejs", {
  });
});

app.post("/", (req, res) => {
    console.log(req.body)
  const data = {
    username: req.body["username"],
  }
  res.render("index.ejs", data);
});

app.get("/myblog", (req, res) => {
  res.render("myblog.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/", (req, res) => {
  res.render("saved.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


