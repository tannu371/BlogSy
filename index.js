import express from "express";
import session from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const SQLiteStore = (await import("connect-sqlite3")).default(session);

const app = express();
const port = 3000;

function generateId() {
  return Math.floor(Math.random() * 100000000000);
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new SQLiteStore(),
    secret: "fuckU",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 360000, secure: false },
  })
);

var userList = [
  {
    userId: 23542454,
    profileImage: "/images/boy.jpg",
    username: "chinchinati34",
    email: "xyz@gmail.com",
    password: "123",
    savedBlogIds: [],
  },
];

var blogList = [
  {
    blogId: 543225543,
    blogWriter: "chinchinti34",
    time: "Fri Jul 18 2025 23:35:27 GMT+1200 (Gilbert Islands Time)",
    title: "The Art of Curating Your Life: From Chaos to Clarity",
    image: "/images/1.jpg",
    description:
      "Your life is more than a to-do list — it's a personal gallery of moments, priorities, and dreams. In this post, we explore how treating your life like a curated collection can help you gain clarity, focus on what matters, and let go of mental clutter. Start crafting a life that reflects you.",
  },
  {
    blogId: 43543245564,
    blogWriter: "chinchinati34",
    time: "Fri Jul 18 2025 23:35:27 GMT+1200 (Gilbert Islands Time)",
    title: "Inventory Your Joy: 10 Things That Quietly Make You Happy",
    image: "/images/2.jpg",
    description:
      "Happiness doesn’t always come with fireworks. Sometimes, it's in the quiet cup of tea, the sound of rain, or the playlist you forgot you loved. This post helps you discover (and document) your subtle joys — the everyday magic that makes life feel alive.",
  },
  {
    blogId: 43564545342,
    blogWriter: "chinchinati34",
    time: "Fri Jul 18 2025 23:35:27 GMT+1200 (Gilbert Islands Time)",
    title: "Vibrant Routines: How Small Habits Create Big Energy",
    image: "/images/3.jpg",
    description:
      "You don’t need a total life overhaul to feel better — just a few vibrant routines. From 5-minute check-ins to morning light rituals, learn how small, consistent habits can recharge your mind and create momentum that sticks.",
  },
  {
    blogId: 4353543654,
    blogWriter: "chinchinati34",
    time: "Fri Jul 18 2025 23:35:27 GMT+1200 (Gilbert Islands Time)",
    title: "Story Storage: How to Capture the Moments That Matter",
    image: "/images/4.jpg",
    description:
      "Life moves fast, but stories give it meaning. In this post, we share creative ways to capture and organize your experiences — from journaling methods to memory boxes and digital diaries. Make remembering part of your routine.",
  },
  {
    blogId: generateId(),
    blogWriter: "chinchinati34",
    time: "Fri Jul 18 2025 23:35:27 GMT+1200 (Gilbert Islands Time)",
    title: "Declutter Your Digital Life: A Guide to Vibrant Minimalism",
    image: "/images/5.jpg",
    description:
      "Your screen shouldn’t stress you out. Explore a step-by-step guide to declutter your digital world — from inboxes to photo galleries — and create space for calm, creativity, and focus. Vibrant minimalism starts here.",
  },
];

// homepage
app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("index.ejs", { user: req.session.user, blogList: blogList });
  } else {
    res.render("index.ejs", { blogList: blogList });
  }
});

// get login page
app.get("/logIn", (req, res) => {
  res.render("logIn.ejs");
});

// get signup page
app.get("/signUp", (req, res) => {
  res.render("signUp.ejs");
});

// logout and redirect to /
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Logout failed");
    } else {
      res.clearCookie("connect.sid"); // 🔐 Clear the session cookie
      res.redirect("/");
    }
  });
});

// blog view
app.get("/blog/:blogId", (req, res) => {
  const blog = blogList.find(
    (blog) => blog.blogId === parseInt(req.params.blogId)
  );
  if (req.session.user) {
    res.render("blogView.ejs", { user: req.session.user, blog: blog });
  } else {
    res.render("blogView.ejs", { blog: blog });
  }
});

// register/signup
app.post("/register", (req, res) => {
  const user = {
    userId: generateId(),
    profileImage: req.body["profile"],
    username: req.body["username"],
    email: req.body["email"],
    password: req.body["password"],
    savedBlogIds: [],
  };
  userList.push(user);

  res.render("logIn.ejs");
});

// login and redirect to /
app.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = userList.find((user) => user.username == username);

  if (user) {
    if (user.password === password) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.render("logIn.ejs", { message: "Passwords Incorrect!" });
    }
  } else {
    res.render("logIn.ejs", { message: "Username doesn't exist" });
  }
});

// get my blogs
app.get("/:username", (req, res) => {
  const username = req.params.username;
  const user = userList.find((user) => user.username === username);
  const userBlogList = blogList.filter((blog) => blog.blogWriter === username);

  res.render("index.ejs", { user: user, blogList: userBlogList });
});

// get create page
app.get("/create/:userId", (req, res) => {
  const user = userList.find(
    (user) => user.userId === parseInt(req.params.userId)
  );
  res.render("create.ejs", { user: user });
});

// handle create data and back to /
app.post("/create/:userId", (req, res) => {
  const user = userList.find(
    (user) => user.userId === parseInt(req.params.userId)
  );
  const blog = {
    blogId: generateId(),
    blogWriter: user.username,
    time: new Date(),
    title: req.body["title"],
    image: req.body["image"],
    description: req.body["description"],
  };
  blogList.unshift(blog);
  res.redirect("/");
});

// get edit box
app.get("/edit/:blogId", (req, res) => {
  const blog = blogList.find(
    (blog) => blog.blogId === parseInt(req.params.blogId)
  );
  const user = userList.find((user) => user.username === blog.blogWriter);
  console.log(blog);
  res.render("edit.ejs", { blog: blog, user: user });
});

// post edited blog
app.post("/edit/:blogId", (req, res) => {
  const blogIndex = blogList.findIndex(
    (blog) => blog.blogId === parseInt(req.params.blogId)
  );
  blogList[blogIndex].title = req.body["title"];
  blogList[blogIndex].image = req.body["image"];
  blogList[blogIndex].description = req.body["description"];
  res.redirect("/");
});

// delete blog
app.post("/delete/:blogId", (req, res) => {
  const blogIndex = blogList.findIndex(
    (blog) => blog.blogId === parseInt(req.params.blogId)
  );
  blogList.splice(blogIndex, 1);
  res.redirect("/");
});

// get all saved blogs
app.get("/saved/:userId", (req, res) => {
  const user = userList.find(
    (user) => user.userId === parseInt(req.params.userId)
  );
  const savedBlogList = user.savedBlogIds.map((blogId) =>
    blogList.find((blog) => blog.blogId === blogId)
  );
  console.log(savedBlogList);
  res.render("index.ejs", { user: user, blogList: savedBlogList });
});

app.post("/save/:userId/:blogId", (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const userIndex = userList.findIndex(
    (user) => user.userId === parseInt(req.params.userId)
  );
  const user = userList[userIndex];
  const savedBlogIds = userList[userIndex].savedBlogIds;

  // toggle save
  if (savedBlogIds !== null) {
    if (!savedBlogIds.includes(blogId)) {
      userList[userIndex].savedBlogIds.unshift(blogId);
    } else {
      const blogIdIndex = savedBlogIds.findIndex((id) => id === blogId);
      userList[userIndex].savedBlogIds.splice(blogIdIndex, 1);
    }
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
