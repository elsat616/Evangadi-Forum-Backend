const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function askQuestion(req, res) {
  const [title, description] = req.body;

  if (!title || !description) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions(title,description) VALUES(?,?)",
      [title, description]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "question posted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

module.exports = { askQuestion };
