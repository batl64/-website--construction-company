import db from "../db.js";
import * as bcrypt from "bcryptjs";

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLEPASSWORD,
  },
});

class AdminController {
  async createAdmin(req, res) {
    try {
      const { PIB, PhoneNumber, Email, Login, Password, Role } = req.body;

      db.query(`Select * FROM users WHERE Login='${Login}'`, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "Registration error" });
        } else if (typeof result !== "undefined" && result.length > 0) {
          return res.status(302).json({ message: "user is login" });
        } else {
          db.query(
            `Select * FROM users WHERE Email='${Email}'`,
            (err, result) => {
              if (err) {
                res.status(400).json({ message: "Registration error" });
              } else if (typeof result !== "undefined" && result.length > 0) {
                return res.status(302).json({ message: "user is email" });
              } else {
                const hashPassword = bcrypt.hashSync(Password, 7);
                db.query(
                  `INSERT INTO users(Login, Password, Role,Email) VALUES ('${Login}','${hashPassword}','${Role}','${Email}')`,
                  (err, result) => {
                    if (err) {
                      return res
                        .status(400)
                        .json({ message: "Registration error" });
                    } else {
                      const userId = result.insertId;
                      db.query(
                        `INSERT INTO administrator( PIB, PhoneNumber, UserId) VALUES ('${PIB}','${PhoneNumber}','${userId}')`,
                        (err, result) => {
                          const url = process.env.ADMIN;
                          const mailOption = {
                            from: process.env.EMAIL,
                            to: [Email],
                            subject:
                              "New Account im BuildCompani Administrator",
                            html: `<h1><b>New account</b></h1>
                            <p>You are an employee of BuildCompani, if not, please ignore this file.</p>
                            <p>Otherwise, click on the link.</p>
                            <p>Your login:${Login}</p>
                            <p>Your password:${Password}</p>
                            <hr/>
                            <p><a href="${url}">Reset password</a></p>`,
                          };

                          transporter.sendMail(mailOption, (err, info) => {
                            if (err) console.log(err);
                          });
                          return res
                            .status(200)
                            .json({ message: "registration ok" });
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    } catch {
      return res.status(400).json({ message: "Registration error" });
    }
  }
  async getAdmin(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    let url = `SELECT administrator.Id, administrator.PIB, administrator.PhoneNumber, users.Email, users.Login, administrator.UserId FROM administrator INNER JOIN users on administrator.UserId=users.Id  Where `;
    const ser = searchFields.split(",");
    ser.map((dat, idx) => {
      url += `${dat} like '%${search}%' `;
      if (idx < ser.length - 1) {
        url += ` OR `;
      }
    });

    url += `ORDER  BY ${orederFild} ${orderDirection} `;
    url += `Limit ${pageSize} `;
    url += `OFFSET ${pageSize * pageNumber}`;

    db.query(url, (err, result) => {
      res.send(result);
    });
  }

  async getOneAdmin(req, res) {
    db.query(
      `SELECT Count(*) As pagesNumber From administrator`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async updateAdmin(req, res) {
    const { Id, PIB, PhoneNumber, Email, UserId, Login } = req.body;

    db.query(
      `Select * FROM users WHERE Login ='${Login}' AND Id <> ${UserId}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({ message: "Registration error" });
        } else if (typeof result !== "undefined" && result.length > 0) {
          return res.status(302).json({ message: "user is login" });
        } else {
          db.query(
            `Select * FROM users WHERE Email='${Email}' AND Id <> ${UserId}`,
            (err, result) => {
              if (err) {
                res.status(400).json({ message: "Registration error" });
              } else if (typeof result !== "undefined" && result.length > 0) {
                return res.status(302).json({ message: "user is email" });
              } else {
                db.query(
                  `UPDATE users set  Email='${Email}',Login ='${Login}' WHERE id = ${UserId}`,
                  (err, result) => {
                    db.query(
                      `UPDATE administrator set  PIB='${PIB}', PhoneNumber=${PhoneNumber} WHERE id = ${Id}`,
                      (err, result) => {
                        return res
                          .status(200)
                          .json({ message: "registration ok" });
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  }
  async deleteAdmin(req, res) {
    const { UserId } = req.body;

    db.query(
      `DELETE FROM administrator WHERE UserId = ${UserId}`,
      (err, result) => {
        db.query(`DELETE FROM users WHERE Id = ${UserId}`, (err, result) => {
          res.json(result);
        });
      }
    );
  }
}

module.exports = new AdminController();
