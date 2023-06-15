import db from "../db.js";
import * as bcrypt from "bcryptjs";

class ContractorController {
  async createContractor(req, res) {
    try {
      const {
        PIB,
        PhoneNumber,
        Email,
        Login,
        Password,
        Role,
        ConfirmationRegistrationAdministrator,
        AdministratorConfirmedRegistration_ID,
        ConfirmationDateRegistration,
      } = req.body;

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
                        `INSERT INTO contractor( PIB, PhoneNumber,ConfirmationRegistrationAdministrator, AdministratorConfirmedRegistration_ID, ConfirmationDateRegistration, UserId) VALUES ('${PIB}','${PhoneNumber}',${0},${null},${null},${userId})`,
                        (err, result) => {
                          res.status(200).json({ message: "Ok" });
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
  async getContractor(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    const user = {
      PIB: "contractor.PIB",
      LoginContractor: "user.Login",
      Email: "user.Email",
      PhoneNumber: "contractor.PhoneNumber",
      ConfirmationRegistrationAdministrator:
        "contractor.ConfirmationRegistrationAdministrator",
      ConfirmationDateRegistration: "contractor.ConfirmationDateRegistration",
      LoginAdmin: "us.Login",
    };
    let url = `SELECT contractor.ID, contractor.UserId, contractor.PIB, contractor.PhoneNumber, contractor.ConfirmationRegistrationAdministrator, us.Login as LoginAdmin, contractor.ConfirmationDateRegistration, user.Login as LoginContractor, user.Email FROM contractor
        LEFT JOIN administrator on contractor.AdministratorConfirmedRegistration_ID = administrator.ID
        LEFT JOIN users as us on administrator.UserId = us.Id
        INNER JOIN users as user on contractor.UserId = user.Id Where `;
    const ser = searchFields.split(",");
    ser.map((dat, idx) => {
      url += `${user[dat]} like '%${search}%' `;
      if (idx < ser.length - 1) {
        url += ` OR `;
      }
    });

    url += `ORDER  BY ${user[orederFild]} ${orderDirection} `;
    url += `Limit ${pageSize} `;
    url += `OFFSET ${pageSize * pageNumber}`;

    db.query(url, (err, result) => {
      res.send(result);
    });
  }

  async getOneContractor(req, res) {
    db.query(
      `SELECT Count(*) As pagesNumber From contractor`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async updateContractor(req, res) {
    const { ID, ConfirmationRegistrationAdministrator, idAdmin } = req.body;
    const Datenow = new Date();
    let date = null;
    if (ConfirmationRegistrationAdministrator == 1) {
      date = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;
    }

    db.query(
      `Select * from administrator WHERE UserId = ${idAdmin}`,
      (err, result) => {
        db.query(
          `UPDATE contractor set ConfirmationDateRegistration=${date}, ConfirmationRegistrationAdministrator=${ConfirmationRegistrationAdministrator}, AdministratorConfirmedRegistration_ID =${result[0].ID} WHERE ID = ${ID}`,
          (err, result) => {
            return res.status(200).json({ message: "update ok" });
          }
        );
      }
    );

    //db.query(`Select * FROM users WHERE Login ='${LoginContractor}' AND Id <> ${UserId}`, (err, result) => {
    //    if (err) {
    //        return res.status(400).json({ message: 'Registration error1' })
    //    }
    //    else if (typeof result !== 'undefined' && result.length > 0) {
    //        return res.status(302).json({ message: 'user is login' })
    //    }
    //    else {
    //        db.query(`Select * FROM users WHERE Email='${Email}' AND Id <> ${UserId}`, (err, result) => {
    //            if (err) {
    //                res.status(400).json({ message: 'Registration error2' })
    //            }
    //            else if (typeof result !== 'undefined' && result.length > 0) {
    //                return res.status(302).json({ message: 'user is email' })
    //            }
    //            else {
    //                db.query(`UPDATE users set  Email='${Email}',Login ='${LoginContractor}' WHERE id = ${UserId}`, (err, result) => {
    //                    db.query(`UPDATE contractor set  PIB='${PIB}', PhoneNumber=${PhoneNumber},ConfirmationRegistrationAdministrator=${ConfirmationRegistrationAdministrator},
    //                             ConfirmationDateRegistration=${ConfirmationDateRegistration} WHERE id = ${ID}`, (err, result) => {
    //                        return res.status(200).json({ message: 'registration ok' })
    //                    });
    //                });
    //            }
    //        });
    //    }
    //})
  }

  async deleteContractor(req, res) {
    const { ID, UserId } = req.body;
    db.query(`DELETE FROM contractor WHERE id = ${ID}`, (err, result) => {
      db.query(`DELETE FROM users WHERE Id = ${UserId}`, (err, result) => {
        res.json(result);
      });
    });
  }
}

module.exports = new ContractorController();
