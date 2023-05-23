const sql = require("../../../sql");

module.exports = {
  async userFavorite(req, res) {
    const email = req.params.email;

    try {
      sql.Connection.query(
        "SELECT favorite as Fav FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          const symbols = results[0].Fav.split(",");
          const placeholder = symbols.map(() => "?").join(","); // Create a placeholder for each symbol
          sql.Connection.query(
            `SELECT * FROM pins WHERE symbol IN (${placeholder})`, // Use the IN operator to match multiple values
            symbols,
            (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(400).send();
              }
              res.status(200).json(results);
            }
          );
          //   res.status(200).json(results);
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
