const dotenv = require("dotenv");
dotenv.config();
const app = require("./Routes/index");
const pool = require("./DB/mysqlConnection");
const createTables = require("./DB/setupDB");

app.get("/", (req, res) => {
  res.render("index", { random: 3 });
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql connected");
    app.listen(process.env.PORT || 4040, () => {
      console.log(`"Server running on port "${process.env.PORT || 4040}"`);
    });
    createTables();
  })
  .catch((err) => {
    console.log(err);
  });
