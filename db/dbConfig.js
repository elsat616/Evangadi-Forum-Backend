const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
	user: "evangadi_admin",
	password: "123456aA",
	database: "evangadiforumdb",
	host: "localhost",
	connectionLimit: 10,
});
// console.log(process.env.JWR_SECRET);

// dbConnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbConnection.promise();

///// turn this on only when creating a table then it off.
// module.exports = dbConnection
