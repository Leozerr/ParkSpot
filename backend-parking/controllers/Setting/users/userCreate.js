const sql = require("../../../sql");

module.exports = {
  async userCreate(req, res) {
    const { uname, email, fname, sname, password } = req.body;
    try {
      sql.Connection.query(
        "INSERT INTO users(username, email, firstname, surname, password) VALUES(?, ?, ?, ?, ?)",
        [uname, email, fname, sname, password],
        (err, results, fields) => {
          if (err) {
            console.log("Error while inserting a user into database", err);
            return res.status(400).send();
          }
          return res
            .status(201)
            .json({ message: "New user successfully created!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
