const sql = require("../../../sql");

module.exports = {
  async userSingle(req, res) {
    const email = req.params.email;

    try {
      sql.Connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json(results);
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
