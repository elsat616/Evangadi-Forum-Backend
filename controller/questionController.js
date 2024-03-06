const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const { createContext } = require("vm");

async function askQuestion(req, res) {
  const { title, description } = req.body;

  const questionid = crypto.randomUUID();

  const userid = req.user.userid;

  console.log(userid + " ---user id");

  console.log(questionid + " ---question");

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      `INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)`,
      [questionid, userid, title, description]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "Question posted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
async function getQuestion(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT questions.id, questions.userid, questions.title, questions.description,username FROM questions INNER JOIN users ON questions.userid = users.userid ORDER BY questions.id DESC`
    );

    // Column 'userid' in field list is ambiguous

    if (questions.length === 0) {
      return res.json({ msg: "No questions posted" });
    }

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
//single question function
async function singleQuestion(req, res) {
  const id = req.params.id;
  console.log(id);
  // const { questionid } = req.body;
  try {
    // Perform a SELECT query to fetch a single question by its ID
    const query = "SELECT * FROM questions WHERE id = ?";
    const [question] = await dbConnection.query(query, [id]);
    // console.log(query)
    // console.log(question[0]);

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }
    // Send the retrieved question as a JSON response
    res.status(StatusCodes.OK).json(question[0]);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while fetching the question",
    });
  }
}
module.exports = { askQuestion, getQuestion, singleQuestion };
