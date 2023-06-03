const sql = require("../../../sql");

module.exports = {
  async userUpImg(req, res) {
    const email = req.params.email;
    const img = req.body.img;

    try {
      sql.Connection.query(
        "UPDATE users SET image = ? WHERE email = ?",
        [img, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Image updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
