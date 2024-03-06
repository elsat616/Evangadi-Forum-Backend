const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Post answer

async function postProfile(req, res) {
  const { bio } = req.body;
  const { phone } = req.body;
  const { firstname } = req.user;
  const { lastname } = req.user;

  const { userid } = req.user;
  // const { firstname } = req.user.firstname;
  // const { lastname } = req.user.lastname;

  try {
    await dbConnection.query(
      "SELECT users.firstname,users.lastname FROM users INNER JOIN profile ON users.userid = profile.userid"
    );

    await dbConnection.query(
      "INSERT INTO profile (userid, firstname, lastname,bio,phone) VALUES (?, ?, ?, ?, ?)",
      [userid, firstname, lastname, bio, phone]
    );
    // console.log(id, "lllllllllllllll");

    return res
      .status(StatusCodes.OK)
      .json({ msg: "profile posted successfully" });
  } catch (error) {
    console.log(error.message, "Error");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. please try again later" });
  }
}
// // Get all answers for a question function
// async function getAnswer(req, res) {
//   const { id } = req.params;
//   // console.log(id);

//   //const questionid = req.params.questionid;
//   // const { questionid } = req.body;
//   try {
//     const uniqueId = await dbConnection.query(
//       "SELECT questionid FROM questions WHERE id = ?",
//       [id]
//     );

//     const questionid = uniqueId[0][0].questionid;
//     const [answer] = await dbConnection.query(
//       "SELECT answer, answers.userid,username From answers INNER JOIN users ON answers.userid = users.userid WHERE questionid = ? ORDER BY answers.answerid DESC",
//       [questionid]
//     );
//     console.log(questionid, "ddddddddddddd");

//     return res.status(StatusCodes.OK).json(answer);
//   } catch (error) {
//     console.error(error.message);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Something went wrong, please try again later" });
//   }
// }
module.exports = { postProfile };
