const sql = require("../../../sql");

module.exports = {
  async emailExist(req, res) {
    const email = req.body.email;

    try {
      sql.Connection.query(
        "SELECT COUNT(*) AS cnt FROM users WHERE email = ? ",
        email,
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data[0].cnt > 0) {
              return res.status(200).json({ message: "Email already exist" });
            } else {
              return res.status(200).json({ message: "Email doesn't exist" });
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
