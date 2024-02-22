// db connection
const dbconnection = require("../db/dbConfig");

// Database table creator function
function createTable(req, res) {
  // Users Table
  const Users = `CREATE TABLE if not exists Users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userid)
    )`;

  // Questions Table
  const Questions = `CREATE TABLE if not exists Questions(
        id INT(20) NOT NULL AUTO_INCREMENT,
        questionid VARCHAR(100) NOT NULL UNIQUE,
        userid INT(20) NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(200) NOT NULL,
        tag VARCHAR(20),
        PRIMARY KEY (id,questionid),
        FOREIGN KEY(userid) REFERENCES Users(userid)
            )`;

  // Answers Table
  const Answers = `CREATE TABLE if not exists Answers(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES Questions(questionid),
    FOREIGN KEY(userid) REFERENCES users(userid)

  )`;

  //Create Table Query function
  function CreateTable(table) {
    dbconnection.query(table, (err) => {
      if (err) console.log(err);
      else console.log("table created");
      res.end("table created");
    });
  }

  //   Table Creation
  CreateTable(Users);
  CreateTable(Questions);
  CreateTable(Answers);
}

module.exports = { createTable };
