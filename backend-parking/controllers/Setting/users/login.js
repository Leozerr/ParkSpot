const sql = require("../../../sql");
const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const query = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    sql.Connection.query(query, [email], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      } else {
        if (results[0].count == 0) {
          res.status(200).json({ message: "Email doesn't exist" });
        } else {
          try {
            sql.Connection.query(
              "SELECT password AS hashedPassword FROM users WHERE email = ?",
              [email],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                } else {
                  const hashedPassword = results[0].hashedPassword;
                  bcrypt.compare(
                    password,
                    hashedPassword,
                    function (err, result) {
                      if (result) {
                        res.status(200).json({ message: "Login Successful" });
                      } else {
                        res.status(200).json({ message: "Invalid Password" });
                      }
                    }
                  );
                }
              }
            );
          } catch (err) {
            console.log(err);
            return res.status(500).send();
          }
        }
      }
    });
  },
};
