require("dotenv").config();
const express = require("express");
const app = express();
const port = 2024;
const cors = require("cors");
app.use(cors());

//user routes middleware file
const UserRoutes = require("./routes/userRoute");

// authotication middlewar
const authMiddleware = require("./middleware/authMiddleware");

//do connection
const dbConnection = require("./db/dbConfig");

//do questions middleware
const questionsRoutes = require("./routes/questionRoute");

//json middleware to extract json
app.use(express.json());

//user routes middleware
app.use("/api/users", UserRoutes);

//questions routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

//answer routes middleware
async function start() {
  try {
    const result = await dbConnection.execute("select'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
