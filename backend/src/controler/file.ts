import path = require("path");
import db from "../db.js";

class MessageController {
  async getFile(req, res) {
    const { contractDoc } = req.query;

    res.download(
      path.join(path.resolve(__dirname, "../../../") + "/file", contractDoc)
    );
  }

  async deleteFile(req, res) {
    const id = req.body.id;
    db.query(`DELETE FROM file WHERE id = ${id}`, (err, result) => {
      res.json(result);
    });
  }

  async createFile(req, res) {
    try {
      const { filename } = req.file;
      const id = req.query.id;
      db.query(
        `UPDATE project SET contractDoc='${filename}' WHERE ID=${id}`,
        (err, result) => {
          res.status(200).json({ message: "File upload" });
        }
      );
    } catch (e) {
      return res.status(500).json({ message: "Upload error" });
    }
  }
}

module.exports = new MessageController();
