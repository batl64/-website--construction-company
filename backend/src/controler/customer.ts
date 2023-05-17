import db from "../db.js";
import * as bcrypt from "bcryptjs";

class CustomerController {
  async createCustomer(req, res) {
    try {
      const { PIB, PhoneNumber, Email, Login, Password, Role, City, Region } =
        req.body;

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
                        `INSERT INTO customer( PIB, PhoneNumber, Region, City, UserId) VALUES ('${PIB}','${PhoneNumber}','${Region}','${City}',${userId})`,
                        (err, result) => {
                          res.status(200).json({ message: "Registration OK" });
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
      console.error();
      res.status(400).json({ message: "Registration error" });
    }
  }
  async getCustomer(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    let url = `SELECT customer.ID, customer.PIB, customer.PhoneNumber, users.Email, users.Login, customer.Region, customer.City, customer.UserId FROM customer INNER JOIN users on customer.UserId = users.Id Where `;
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
      res.json(result);
    });
  }
  async getOneCustomer(req, res) {
    db.query(`SELECT Count(*) As pagesNumber From customer`, (err, result) => {
      res.json(result);
    });
  }
  async updateCustomer(req, res) {
    const { ID, PIB, PhoneNumber, Email, Login, UserId, City, Region } =
      req.body;
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
                      `UPDATE customer set  PIB='${PIB}', PhoneNumber=${PhoneNumber},City='${City}',Region='${Region}' WHERE id = ${ID}`,
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

  async deleteCustomer(req, res) {
    const { ID, UserId } = req.body;

    db.query(`DELETE FROM customer WHERE ID = ${ID}`, (err, result) => {
      db.query(`DELETE FROM users WHERE Id = ${UserId}`, (err, result) => {
        res.json(result);
      });
    });
  }
}

module.exports = new CustomerController();
