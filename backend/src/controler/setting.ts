import db from "../db.js";

class AdminController {
  async getSetting(req, res) {
    const { language } = req.query;

    db.query(
      `SELECT * FROM setting WHERE language = '${language}'`,

      (err, result) => {
        res.json(result);
      }
    );
  }
  async updateSetting(req, res) {
    const { SiteName, about, language } = req.body;
    db.query(
      `UPDATE setting SET siteName='${SiteName}',about='${about}' WHERE language='${language}'`,
      (err, result) => {
        res.json(result);
      }
    );
  }
}

module.exports = new AdminController();
