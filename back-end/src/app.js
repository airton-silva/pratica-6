const express = require("express");
const cors = require("cors");
//const cookieParser = require("cookie-parser");
//const sessions = require("express-session");
require("dotenv/config");
const app = express();;
const port = 3000;

app.use(cors({ credentials: true, origin: true }));
// app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static("public"));

// Routes
const index = require("./routes/index.js");
const post = require("./routes/post-route");
const comment = require("./routes/comment-route");
const user = require("./routes/users-route");


app.use("/", index);
app.use("/posts", post);
app.use("/comments", comment);
app.use("/users", user);

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});

// Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});