require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const Router = require("./routes/router.js");

const port = 3000;

const dbConnect = require("./db/dbProcessor.js");

dbConnect.enableConnection();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", Router);

app.listen(port, () => {
  console.log(`REST is listening on port ${port}`);
});
