const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function askQuestion(req, res) {
  const { title, description } = req.body;

  const questionid = crypto.randomUUID();

  const userid = req.user.userid;

  console.log(userid + " ---user id");

  console.log(questionid + " ---question");

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      `INSERT INTO questions(questionid,userid,title,description) VALUES(?,?,?,?)`,
      [questionid, userid, title, description]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "question posted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!kkk" });
  }
}

async function getQuestion(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT id,userid,title,description From questions`
    );

    if (questions.length == 0) {
      return res.json({ msg: "no question posted" });
    }

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!555" });
  }
}

module.exports = { askQuestion, getQuestion };
