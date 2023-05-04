const sql = require("../../../sql");

module.exports = {
  async userCreate(req, res) {
    const { uname, email, password } = req.body;
    try {
      sql.Connection.query(
        "SELECT COUNT(*) AS cnt FROM users WHERE email = ? ",
        req.body.email,
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data[0].cnt > 0) {
              // console.log("Email already exist");
              return res.status(400).json({ message: "Email already exist" });
            } else {
              sql.Connection.query(
                "INSERT INTO users(username, email, password) VALUES(?, ?, ?)",
                [uname, email, password],
                (err, results, fields) => {
                  if (err) {
                    console.log(
                      "Error while inserting a user into database",
                      err
                    );
                    return res.status(400).send();
                  }
                  return res
                    .status(201)
                    .json({ message: "New user successfully created!" });
                }
              );
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
