import db from "../db.js";

class OfferedContractorsController {
  async createOfferedContractors(req, res) {
    const { Project_ID, User_ID, ContractorSuggestedPrice, description } =
      req.body;
    db.query(`Select * from project Where Id=${Project_ID}`, (err, reselt) => {
      const Administrator_ID = reselt[0].Administrator_ID;

      db.query(
        `Select * from contractor Where UserId=${User_ID}`,
        (err, reselt) => {
          const Contractor_ID = reselt[0].ID;

          db.query(
            `INSERT INTO offeredcontractors(Project_ID, Contractor_ID, ContractorSuggestedPrice, Administrator_ID,description) VALUES (${Project_ID},${Contractor_ID},${ContractorSuggestedPrice},${Administrator_ID},'${description}')`,
            (err, result) => {
              res.status(200).json({ message: "List creacte" });
            }
          );
        }
      );
    });
  }
  async getOfferedContractors(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    const user = {
      Project_ID: "offeredcontractors.Project_ID",
      ContractorSuggestedPrice: "offeredcontractors.ContractorSuggestedPrice",
      LoginContractor: "user.Login",
      LoginAdministrator: "us.Login",
    };
    let url = `SELECT offeredcontractors.ID,description, offeredcontractors.Project_ID, offeredcontractors.ContractorSuggestedPrice, us.Login as LoginAdministrator, user.Login as LoginContractor FROM offeredcontractors
        INNER JOIN contractor on offeredcontractors.Contractor_ID = contractor.ID
        INNER JOIN administrator on offeredcontractors.Administrator_ID = administrator.ID
        INNER JOIN users as us on administrator.UserId = us.Id
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
  async getOneOfferedContractors(req, res) {
    db.query(
      `SELECT Count(*) As pagesNumber From offeredcontractors`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  //ff
  async offeredcontractorsOnCust(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      id,
    } = req.query;
    const user = {
      Project_ID: "offeredcontractors.Project_ID",
      ContractorSuggestedPrice: "offeredcontractors.ContractorSuggestedPrice",
      LoginContractor: "user.Login",
      LoginAdministrator: "us.Login",
      description: "description",
    };
    db.query(
      `SELECT * FROM contractor WHERE contractor.UserId =${id}`,
      (err, result) => {
        let url = `SELECT offeredcontractors.ID,offeredcontractors.description, offeredcontractors.Project_ID, offeredcontractors.ContractorSuggestedPrice, us.Login as LoginAdministrator, user.Login as LoginContractor FROM offeredcontractors
        INNER JOIN contractor on offeredcontractors.Contractor_ID = contractor.ID
        LEFT JOIN administrator on offeredcontractors.Administrator_ID = administrator.ID
        LEFT JOIN users as us on administrator.UserId = us.Id
        INNER JOIN users as user on contractor.UserId = user.Id Where offeredcontractors.Contractor_ID= ${result[0].ID} AND(`;
        const ser = searchFields.split(",");
        ser.map((dat, idx) => {
          url += `${user[dat]} like '%${search}%' `;
          if (idx < ser.length - 1) {
            url += ` OR `;
          }
        });

        url += `) ORDER  BY ${user[orederFild]} ${orderDirection} `;
        url += `Limit ${pageSize} `;
        url += `OFFSET ${pageSize * pageNumber}`;

        db.query(url, (err, result) => {
          res.send(result);
        });
      }
    );
  }
  async offeredcontractorsPageOnCust(req, res) {
    const { id } = req.query;
    db.query(
      `SELECT * FROM contractor WHERE contractor.UserId =${id}`,
      (err, result) => {
        db.query(
          `SELECT Count(*) As pagesNumber From offeredcontractors Where Contractor_ID =${result[0].ID} `,
          (err, result) => {
            res.json(result);
          }
        );
      }
    );
  }

  async offeredcontractorsUser(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      pojectId,
    } = req.query;
    const user = {
      Project_ID: "offeredcontractors.Project_ID",
      ContractorSuggestedPrice: "offeredcontractors.ContractorSuggestedPrice",
      LoginContractor: "user.Login",
      LoginAdministrator: "us.Login",
    };
    let url = `SELECT offeredcontractors.ID,offeredcontractors.description, offeredcontractors.Project_ID,us.Login as LoginAdministrator, contractor.ID As Contractor_ID, offeredcontractors.ContractorSuggestedPrice,contractor.PhoneNumber as CustomerPhone, user.Email as CustomerEmail, user.Login as LoginContractor FROM offeredcontractors
        INNER JOIN contractor on offeredcontractors.Contractor_ID = contractor.ID
        Left JOIN administrator on offeredcontractors.Administrator_ID = administrator.ID
        Left JOIN users as us on administrator.UserId = us.Id
        INNER JOIN users as user on contractor.UserId = user.Id Where offeredcontractors.Project_ID=${pojectId} AND(`;
    const ser = searchFields.split(",");
    ser.map((dat, idx) => {
      url += `${user[dat]} like '%${search}%' `;
      if (idx < ser.length - 1) {
        url += ` OR `;
      }
    });

    url += `) ORDER  BY ${user[orederFild]} ${orderDirection} `;
    url += `Limit ${pageSize} `;
    url += `OFFSET ${pageSize * pageNumber}`;

    db.query(url, (err, result) => {
      res.send(result);
    });
  }
  async offeredcontractorsUserPage(req, res) {
    const { pojectId } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From offeredcontractors Where Project_ID =${pojectId} `,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async deleteOfferedContractors(req, res) {
    const id = req.body.id;

    db.query(
      `DELETE FROM offeredcontractors WHERE ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
}

module.exports = new OfferedContractorsController();
