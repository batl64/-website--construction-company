import path = require("path");
import db from "../db.js";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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

const generateResetToken = (id, login, email) => {
  const payload = {
    id,
    login,
    email,
  };
  return jwt.sign(payload, process.env.SECRET_KEY_RESET, { expiresIn: "1h" });
};

class ResetController {
  async reset(req, res) {
    try {
      const { Login } = req.body;
      db.query(
        `Select * FROM users WHERE Login="${Login}" OR Email="${Login}"`,
        (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Login error" });
          } else if (typeof result !== "undefined" && result.length > 0) {
            const resetToken = generateResetToken(
              result[0].Id,
              result[0].Login,
              result[0].Email
            );

            const body = {
              resetToken: resetToken,
              Login: result[0].Login,
            };
            const url =
              result[0].Role == "admin"
                ? process.env.ADMIN +
                  `/newPassword?` +
                  new URLSearchParams(body)
                : process.env.PUBLICADDRESS +
                  `/newPassword?` +
                  new URLSearchParams(body);

           
            const mailOption = {
              from: process.env.EMAIL,
              to: [result[0].Email, "mmailbuildcompani@gmail.com"],
              subject: "Reset password",
              html: `<h1><b>Reset Password</b></h1>
              <p>Do you want to recover your BuildCompani password? If not, please ignore this email.</p>
              <p>Otherwise, click on the link.</p>
              <hr/>
              <p><a href="${url}">Reset password</a></p>`,
            };

            transporter.sendMail(mailOption, (err, info) => {
              if (err) console.log(err);
            });
            db.query(
              `UPDATE users SET resetToken='${resetToken}' WHERE Id=${result[0].Id}`,
              (err, result) => {
                return res.status(200).json({ message: "Reset Token create" });
              }
            );
          } else {
            res.status(400).json({ message: "Login or Email error" });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async newPassword(req, res) {
    try {
      const { Login, resetToken } = req.query;

      db.query(
        `Select * FROM users WHERE Login="${Login}" OR Email="${Login}"`,
        (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Login error" });
          } else if (typeof result !== "undefined" && result.length > 0) {
            if (result[0].resetToken === resetToken) {
              const body = {
                resetToken: resetToken,
                Login: result[0].Login,
              };
              const url =
                result[0].Role == "admin"
                  ? process.env.ADMIN +
                    `/newPassword?` +
                    new URLSearchParams(body)
                  : process.env.PUBLIC +
                    `/newPassword?` +
                    new URLSearchParams(body);

              return res.redirect(url);
            } else {
              res.status(400).json({ message: "Login error" });
            }
          } else {
            res.status(400).json({ message: "Login error" });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async resetPassword(req, res) {
    try {
      const { Login, resetToken, password } = req.body;
      db.query(
        `Select * FROM users WHERE Login="${Login}" AND resetToken="${resetToken}" OR Email="${Login}" AND resetToken="${resetToken}" `,
        (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Login error" });
          } else if (typeof result !== "undefined" && result.length > 0) {
            if (result[0].resetToken === resetToken) {
              const hashPassword = bcrypt.hashSync(password, 7);

              db.query(
                `UPDATE users SET Password='${hashPassword}' WHERE Id = ${result[0].Id}`,
                (err, resultat) => {
                  res.status(200).json({ message: "Ok" });
                }
              );
            } else {
              res.status(400).json({ message: "Login error" });
            }
          } else {
            res.status(400).json({ message: "Login error" });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ResetController();
