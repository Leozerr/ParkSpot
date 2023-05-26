const sql = require("../../../sql");
const bcrypt = require("bcrypt");

module.exports = {
  async userUpdatePass(req, res) {
    const email = req.params.email;
    const newPassword = req.body.newPassword;

    bcrypt.hash(newPassword, saltRounds, function (err, hashedPassword) {
      if (err) {
        console.error("Error hashing password: " + err);
        return;
      }
      try {
        sql.Connection.query(
          "UPDATE users SET password = ? WHERE email = ?",
          [hashedPassword, email],
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            }
            res.status(200).json({ message: "Password updated successfully!" });
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    });
  },
};
