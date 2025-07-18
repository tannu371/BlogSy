import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var userList = [
  {
    profile: "images/boy.jpg",
    username: "chinchinati34",
    email: "xyz@gmail.com",
    password: "123",
  },
];

var blogList = [
  {
    username: "chinchinti34",
    id: 2439284,
    time: new Date(),
    title: "The Art of Curating Your Life: From Chaos to Clarity",
    image: "/images/1.jpg",
    description:
      "Your life is more than a to-do list — it's a personal gallery of moments, priorities, and dreams. In this post, we explore how treating your life like a curated collection can help you gain clarity, focus on what matters, and let go of mental clutter. Start crafting a life that reflects you.",
  },
  {
    username: "chinchinati34",
    id: 32432545,
    time: new Date(),
    title: "Inventory Your Joy: 10 Things That Quietly Make You Happy",
    image: "/images/2.jpg",
    description:
      "Happiness doesn’t always come with fireworks. Sometimes, it's in the quiet cup of tea, the sound of rain, or the playlist you forgot you loved. This post helps you discover (and document) your subtle joys — the everyday magic that makes life feel alive.",
  },
  {
    username: "chinchinati34",
    id: 23143245,
    time: new Date(),
    title: "Vibrant Routines: How Small Habits Create Big Energy",
    image: "/images/3.jpg",
    description:
      "You don’t need a total life overhaul to feel better — just a few vibrant routines. From 5-minute check-ins to morning light rituals, learn how small, consistent habits can recharge your mind and create momentum that sticks.",
  },
  {
    username: "chinchinati34",
    id: 23425435,
    time: new Date(),
    title: "Story Storage: How to Capture the Moments That Matter",
    image: "/images/4.jpg",
    description:
      "Life moves fast, but stories give it meaning. In this post, we share creative ways to capture and organize your experiences — from journaling methods to memory boxes and digital diaries. Make remembering part of your routine.",
  },
  {
    username: "chinchinati34",
    id: 3242425,
    time: new Date(),
    title: "Declutter Your Digital Life: A Guide to Vibrant Minimalism",
    image: "/images/5.jpg",
    description:
      "Your screen shouldn’t stress you out. Explore a step-by-step guide to declutter your digital world — from inboxes to photo galleries — and create space for calm, creativity, and focus. Vibrant minimalism starts here.",
  },
];

function generateId() {
  return Math.floor(Math.random() * 100000000000);
}

// get / login sign

app.get("/", (req, res) => {
  res.render("index.ejs", { blogList: blogList });
});

app.get("/logIn", (req, res) => {
  res.render("logIn.ejs");
});

app.get("/signUp", (req, res) => {
  res.render("signUp.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// post signin login

app.post("/submit", (req, res) => {
  console.log(req.body);

  const data = {
    profile: req.body["profile"],
    username: req.body["username"],
    email: req.body["email"],
    password: req.body["password"],
  };

  userList.push(data);

  res.render("logIn.ejs");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const Username = req.body["username"];
  const Password = req.body["password"];

  const user = userList.find((user) => user.username == Username);

  console.log(user);

  if (user) {
    if (user.password === Password) {
      res.render("index.ejs", { user: user, blogList: blogList });
    } else {
      res.render("logIn.ejs", { message: "Passwords Incorrect!" });
    }
  } else {
    res.render("logIn.ejs", { message: "Username doesn't exist" });
  }
});

app.get("/:username", (req, res) => {
  const user = userList.find((user) => user.username === req.params.username);
  const userBlogList = blogList.filter(
    (blog) => blog.username === req.params.username
  );
  res.render("index.ejs", { user: user, blogList: userBlogList });
});

app.get("/blog/:id", (req, res) => {
  const blog = blogList.find((blog) => blog.id === parseInt(req.params.id));
  console.log(blog);
  res.render("blogView.ejs", blog);
});

app.post("/create", (req, res) => {
  const blog = {
    id: generateId(),
    time: new Date(),
    title: req.body["title"],
    image: __dirname + req.body["image"],
    description: req.body["description"],
  };
  blogList.unshift(blog);
  res.render("index.ejs", { blogList: blogList });
});

app.get("/edit/:id", (req, res) => {
  const blog = blogList.find((blog) => blog.id == parseInt(req.params.id));
  console.log(blog);
  res.render("create.ejs", { blog: blog });
});

app.post("/edit/:id", (req, res) => {
  const blogIndex = blogList.findIndex(
    (blog) => blog.id == parseInt(req.params.id)
  );
  blogList[blogIndex].title = req.body["title"];
  blogList[blogIndex].image = __dirname + req.body["image"];
  blogList[blogIndex].description = req.body["description"];
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const blogIndex = blogList.findIndex(
    (blog) => blog.id === parseInt(req.params.id)
  );
  console.log(req.params.id);
  console.log(blogIndex);
  blogList.splice(blogIndex, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
