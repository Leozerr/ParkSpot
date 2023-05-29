const sql = require("../../../sql");

module.exports = {
  async adminLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
    sql.Connection.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Error executing login query: ", err);
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          // Successful login
          res.status(200).json({ message: "Login successful" });
        } else {
          // Invalid credentials
          res.status(401).json({ error: "Invalid username or password" });
        }
      }
    });
  },
};
