const sql = require("../../../sql");

module.exports = {
  async camDelete(req, res) {
    const name = req.params.name;

    try {
      sql.Connection.query(
        "DELETE FROM camera WHERE name = ?",
        [name],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "No camera with that name!" });
          }
          res.status(200).json({ message: "Camera deleted successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
