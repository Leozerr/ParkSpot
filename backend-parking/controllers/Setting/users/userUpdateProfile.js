const sql = require("../../../sql");
const bcrypt = require("bcrypt");

module.exports = {
  async userUpdateProfile(req, res) {
    const email = req.params.email;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, function (err, hashedPassword) {
      if (err) {
        console.error("Error hashing password: " + err);
        return;
      }
      try {
        sql.Connection.query(
          "UPDATE users SET username = ?, password = ? WHERE email = ?",
          [newUsername, hashedPassword, email],
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            }
            res.status(200).json({ message: "Profile updated successfully!" });
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    });
  },
};
