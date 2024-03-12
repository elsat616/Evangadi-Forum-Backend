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

module.exports = { postProfile };
