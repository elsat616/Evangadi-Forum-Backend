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
//all questions function
async function allQuestions(req, res) {
	try {
		//query all questions from the questions database
		const [allQuestion] = await dbConnection.query(
			"SELECT q.title, q.description, q.questionid ,q.tag ,u.username  FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC;"
		);
		return res.status(StatusCodes.OK).json({ allQuestion });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		// console.log(error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "Something went wrong, please try again",
		});
	}
}

module.exports = { askQuestion, allQuestions };