const sql = require("../../../sql");

module.exports = {
  async adminCreate(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const query = "INSERT INTO admin(username, password) VALUES(?, ?)";
    sql.Connection.query(query, [username, password], (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          // Successful login
          res.status(200).json({ message: "Create successful" });
        } else {
          // Invalid credentials
          res.status(401).json({ error: "Failed to create" });
        }
      }
    });
  },
};
