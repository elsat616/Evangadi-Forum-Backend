require("dotenv").config();
const express = require("express");
const app = express();
const port = 2024;
const cors = require("cors");
app.use(cors());

//////////////////// table start//////////////////////////
// table routes middleware file
const tableRouter = require("./routes/createTableRoute");

// table routes middleware
app.use("", tableRouter);
/*******************table end*************************/

//user routes middleware file.file.
const UserRoutes = require("./routes/userRoute");

// authotication middlewar
const authMiddleware = require("./middleware/authMiddleware");

//do connection
const dbConnection = require("./db/dbConfig");

//do questions middleware
const questionsRoutes = require("./routes/questionRoute");

//answer route middleware file
const answerRoutes = require("./routes/answerRoute");


//json middleware to extract json
app.use(express.json());

//user routes middleware
app.use("/api/users", UserRoutes);

//questions routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);


// answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port  http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
