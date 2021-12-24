import * as mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "instagram_clone",
});

connection.connect();

export default connection;
