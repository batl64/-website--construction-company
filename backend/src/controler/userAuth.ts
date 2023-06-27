import db from "../db.js";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

const validAccesToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    return userData;
  } catch (e) {
    return null;
  }
};

class AuthrController {
  async login(req, res) {
    try {
      const { Password, Login, Role } = req.body;

      db.query(
        `Select * FROM users WHERE Login="${Login}" OR Email="${Login}"`,
        (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Login error" });
          } else if (typeof result !== "undefined" && result.length > 0) {
            const validPassword = bcrypt.compareSync(
              Password,
              result[0].Password
            );
            if (!validPassword) {
              return res.status(400).json({ message: "Login error" });
            }
            if (result[0].Role == "admin") {
              const token = generateAccessToken(result[0].Id, result[0].Role);
              return res.json({
                token,
                userId: result[0].Id,
                email: result[0].Email,
                login: result[0].Login,
                role: result[0].Role,
              });
            } else {
              res.status(400).json({ message: "Login error" });
            }
          } else {
            res.status(400).json({ message: "Login error" });
          }
        }
      );
    } catch {
      res.status(400).json({ message: "login error" });
    }
  }

  async loginPublic(req, res) {
    try {
      const { Password, Login } = req.body;

      db.query(
        `Select * FROM users  WHERE Login="${Login}" OR Email="${Login}"`,
        (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Login error" });
          } else if (typeof result !== "undefined" && result.length > 0) {
            const validPassword = bcrypt.compareSync(
              Password,
              result[0].Password
            );
            if (!validPassword) {
              return res.status(400).json({ message: "Login error" });
            }
            if (result[0].Role !== "admin") {
              const Role = result[0].Role;
              const UserId = result[0].Id;
              const Email = result[0].Email;
              const Loginuser = result[0].Login;
              if (result[0].Role !== "contractor") {
                const token = generateAccessToken(result[0].Id, Role);
                return res.json({
                  token,
                  userId: UserId,
                  email: Email,
                  login: Loginuser,
                  role: Role,
                  confirm: null,
                });
              } else {
                db.query(
                  `Select * FROM ${Role}  WHERE UserId="${UserId}"`,
                  (err, result) => {
                    const token = generateAccessToken(UserId, Role);
                    return res.json({
                      token,
                      userId: UserId,
                      email: Email,
                      login: Loginuser,
                      role: Role,
                      confirm: result[0].ConfirmationRegistrationAdministrator,
                    });
                  }
                );
              }
            } else {
              res.status(400).json({ message: "Login error" });
            }
          } else {
            res.status(400).json({ message: "Login error" });
          }
        }
      );
    } catch {
      res.status(400).json({ message: "login error" });
    }
  }

  async auth(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "not auth" });
    }

    const userData = validAccesToken(token);

    if (!userData) {
      return res.status(401).json({ message: "not auth" });
    }

    db.query(`SELECT * FROM users Where Id='${userData.id}'`, (err, result) => {
      if (result[0].Role == "admin") {
        const Role = result[0].Role;
        const UserId = result[0].Id;
        const Email = result[0].Email;
        const Loginuser = result[0].Login;
        const token = generateAccessToken(result[0].Id, Role);
        return res.json({
          token,
          userId: UserId,
          email: Email,
          login: Loginuser,
          role: Role,
        });
      } else {
        return res.status(401).json({ message: "not auth" });
      }
    });
  }

  async authPublic(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "not auth" });
    }

    const userData = validAccesToken(token);

    if (!userData) {
      return res.status(401).json({ message: "not auth" });
    }

    db.query(`SELECT * FROM users Where Id='${userData.id}'`, (err, result) => {
      if (result.length == 0) {
        res.status(400).json({ message: "NotCorrectToken" });
      } else {
        if (result[0].Role !== "admin") {
          const Role = result[0].Role;
          const UserId = result[0].Id;
          const Email = result[0].Email;
          const Loginuser = result[0].Login;
          if (result[0].Role !== "contractor") {
            const token = generateAccessToken(result[0].Id, Role);
            return res.json({
              token,
              userId: UserId,
              email: Email,
              login: Loginuser,
              role: Role,
              confirm: null,
            });
          } else {
            db.query(
              `Select * FROM ${Role}  WHERE UserId="${UserId}"`,
              (err, result) => {
                const token = generateAccessToken(UserId, Role);
                return res.json({
                  token,
                  userId: UserId,
                  email: Email,
                  login: Loginuser,
                  role: Role,
                  confirm: result[0].ConfirmationRegistrationAdministrator,
                });
              }
            );
          }
        } else {
          res.status(400).json({ message: "Login error" });
        }
      }
    });
  }
  async getUsers(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    let url = `SELECT Id,Login,Role,Email FROM users Where `;
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

  async getusersInfo(req, res) {
    const { ID, Role } = req.query;
    if (Role === "contractor") {
      db.query(
        `SELECT users.Login, users.Email,contractor.PhoneNumber, contractor.PIB FROM users Left JOIN contractor as contractor on users.Id = contractor.UserId  WHERE users.Id=${ID}`,
        (err, result) => {
          res.send(result[0]);
        }
      );
    } else if (Role === "customer") {
      db.query(
        `SELECT users.Login, users.Email,customer.PhoneNumber, customer.PIB,customer.Region,customer.City FROM users Left JOIN customer as customer on users.Id = customer.UserId  WHERE users.Id=${ID}`,
        (err, result) => {
          res.send(result[0]);
        }
      );
    }
  }

  async changePassword(req, res) {
    const { Password, oldPassword, userId } = req.body;

    db.query(`Select * From users WHERE Id = ${userId} `, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Registration error" });
      } else if (result.length == 0) {
        return res.status(302).json({ message: "user is login" });
      } else {
        const validPassword = bcrypt.compareSync(
          oldPassword,
          result[0].Password
        );
        if (!validPassword) {
          return res.status(400).json({ message: "Password error" });
        }
        const hashPassword = bcrypt.hashSync(Password, 7);
        db.query(
          `UPDATE users set  Password='${hashPassword}' WHERE id = ${userId}`,
          (err, result) => {
            res.json(result);
          }
        );
      }
    });
  }

  async getOneUsers(req, res) {
    db.query(`SELECT Count(*) As pagesNumber From users`, (err, result) => {
      res.json(result);
    });
  }
  async deleteUsers(req, res) {
    const { id, Role } = req.body;

    const table = {
      admin: "administrator",
      contractor: "contractor",
      customer: "customer",
    };
    db.query(
      `DELETE FROM ${table[Role]} WHERE UserId = ${id}`,
      (err, result) => {
        db.query(`DELET FROM users WHERE id = ${id}`, (err, result) => {
          res.json(result);
        });
      }
    );
  }
}

module.exports = new AuthrController();
