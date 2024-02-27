const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Post answer
async function postAnswer(req, res) {
	const { answer } = req.body;
	// const { questionid } = req.params;

	const { questionid } = req.body;
	const { userid } = req.user;
	console.log(questionid);
	if (!answer) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Provide answer field" });
	}

	try {
		// const duplicateAnswer = await dbConnection.query(
		// 	"SELECT * FROM answers WHERE userid = ? AND questionid = ?",
		// 	[userid, questionid]
		// );

		// if (duplicateAnswer.length > 0) {
		// 	return res.status(StatusCodes.BAD_REQUEST).json({
		// 		msg: "You have already posted an answer for this question",
		// 	});
		// }

		await dbConnection.query(
			"INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
			[userid, questionid, answer]
		);

		return res
			.status(StatusCodes.OK)
			.json({ msg: "Answer posted successfully" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong. please try again later" });
	}
}
// Get all answers for a question function
async function getAnswer(req, res) {
    
	//const questionid = req.params.questionid;
	const { questionid } = req.body;
	try {
		const [answer] = await dbConnection.query(
			"SELECT answer, username FROM answers JOIN users ON answers.userid = users.userid WHERE questionid = ?",
			[questionid]
		);
		console.log(answer[0].questionid);
		return res.status(StatusCodes.OK).json({ answer });
	} catch (error) {
		console.error(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, please try again later" });
	}
}
module.exports = { postAnswer, getAnswer };


