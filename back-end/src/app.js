const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
//const path = require('path');
app.use(express.static("public"));

// Routes
const index = require("./routes/index.js");
const funcionario = require("./routes/funcionario-route");
//const upload = require("./routes/upload-route");


app.use("/", index);
app.use("/funcionarios", funcionario);
//app.use("/public/uploads", funcionario);

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