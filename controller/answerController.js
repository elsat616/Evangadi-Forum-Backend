const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Post answer

async function postAnswer(req, res) {
  const { answer } = req.body;
  // const { questionid } = req.params;

  const { id } = req.params;
  const { userid } = req.user;
  const { username } = req.user;
  console.log(id + " ---id, ", username + " ---userName");
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide answer field" });
  }

  try {
    const uniqueId = await dbConnection.query(
      "SELECT questionid FROM questions WHERE id = ?",
      [id]
    );
    const questionid = uniqueId[0][0].questionid;

    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message, "qqqqqqqqq");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. please try again later" });
  }
}

async function getAnswer(req, res) {
  const { id } = req.params;

  try {
    const uniqueId = await dbConnection.query(
      "SELECT questionid FROM questions WHERE id = ?",
      [id]
    );

    const questionid = uniqueId[0][0].questionid;
    const [answer] = await dbConnection.query(
      "SELECT answer, answers.userid,username From answers INNER JOIN users ON answers.userid = users.userid WHERE questionid = ? ORDER BY answers.answerid DESC",
      [questionid]
    );
    console.log(questionid, "ddddddddddddd");

    return res.status(StatusCodes.OK).json(answer);
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}
module.exports = { postAnswer, getAnswer };
