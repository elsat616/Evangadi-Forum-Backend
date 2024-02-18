const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: "evangadi_admin",
  database: "evangadiforumdb",
  host: "localhost",
  password: "Admin1234%^",
  connectionLimit: 10,
});
// dbConnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports=dbConnection.promise()
