import db from "../db.js";

class MessageController {
  async createMessage(req, res) {
    const { text, userReceiverId, userAuthorId, projectId } = req.body;
    const Datenow = new Date();
    const DateCreation = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;
    db.query(
      `INSERT INTO message( text, userReceiverId, userAuthorId, projectId, createDate) VALUES ('${text}',${userReceiverId},${userAuthorId},${projectId},${DateCreation})`,
      (err, result) => {
        res.status(200).json({ message: "Message create" });
      }
    );
  }

  async messageByproject(req, res) {
    const id = req.query.id;
    db.query(
      `SELECT text, createDate, users1.Login as Receiver, users2.Login as Author, message.userAuthorId as userAuthorId, message.userReceiverId as userReceiverId FROM message
    INNER JOIN users as users1 on message.userReceiverId = users1.Id
    LEFT JOIN users  as users2 on message.userAuthorId = users2.Id
    WHERE projectId = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async getMessage(req, res) {
    const id = req.params.id;
    db.query(
      `SELECT * FROM message WHERE userReceiverId = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async deleteMessage(req, res) {
    const id = req.body.id;
    db.query(`DELETE FROM message WHERE id = ${id}`, (err, result) => {
      res.json(result);
    });
  }
}

module.exports = new MessageController();
