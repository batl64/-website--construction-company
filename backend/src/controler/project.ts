import { compileFunction } from "vm";
import db from "../db.js";

class ProjectController {
  async createProject(req, res) {
    const {
      ApprovedContractor_ID,
      CommonApproximateConstructionEstimate,
      Status,
      Administrator_ID,
      ProjectClosingDate,
      FullBuldingAdress,
      id,
    } = req.body;

    db.query(`SELECT * FROM customer Where UserId=${id}`, (err, result) => {
      const Customer_ID = result[0].ID;
      db.query(
        `INSERT INTO project(Customer_ID, ApprovedContractor_ID, CommonApproximateConstructionEstimate, Status, Administrator_ID, ProjectClosingDate, FullBuldingAdress)
VALUES (${Customer_ID},${ApprovedContractor_ID},${CommonApproximateConstructionEstimate},${Status},${Administrator_ID},${ProjectClosingDate},'${FullBuldingAdress}')`,
        (err, result) => {
          res.status(200).json({ message: "List creacte" });
        }
      );
    });
  }
  async getProject(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
    } = req.query;
    const user = {
      Status: "project.Status",
      LoginContactor: "users2.Login",
      FullBuldingAdress: "project.FullBuldingAdress",
      ProjectClosingDate: "project.ProjectClosingDate",
      CommonApproximateConstructionEstimate:
        "project.CommonApproximateConstructionEstimate",
      LoginCustomer: "users1.Login",
      LoginAdministrator: "users3.Login",
    };
    let url = `SELECT project.ID, users1.Login as LoginCustomer, users2.Login as LoginContactor, project.CommonApproximateConstructionEstimate, project.Status, users3.Login as LoginAdministrator, project.ProjectClosingDate,project.FullBuldingAdress
                FROM project
                INNER JOIN customer on project.Customer_ID = customer.ID
                INNER JOIN users as users1 on customer.UserId = users1.ID
                LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID
                LEFT JOIN users  as users2 on contractor.UserId = users2.ID
                LEFT JOIN administrator on project.Administrator_ID = administrator.ID
                LEFT JOIN users as users3 on administrator.UserId = users3.ID Where `;
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
      res.json(result);
    });
  }

  async getProjectDetails(req, res) {
    const { id } = req.query;
    db.query(
      `SELECT  users1.ID as customerUserId, users2.ID as contractorUserId, CommonApproximateConstructionEstimate,FullBuldingAdress,ProjectClosingDate,Status,Administrator_ID
    FROM project
    INNER JOIN customer on project.Customer_ID = customer.ID
    INNER JOIN users as users1 on customer.UserId = users1.ID
    LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID
    LEFT JOIN users  as users2 on contractor.UserId = users2.ID WHERE project.ID = ${id}`,
      (err, result) => {
        if (err) {
          console.error("Помилка при виконанні запиту:", err);
          return;
        }
        res.json(result[0]);
      }
    );
  }

  async getOneProject(req, res) {
    db.query(`SELECT Count(*) As pagesNumber From project`, (err, result) => {
      if (err) {
        console.error("Помилка при виконанні запиту:", err);
        return;
      }
      res.json(result);
    });
  }

  async projectCont(req, res) {
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
      Status: "project.Status",
      LoginContactor: "users2.Login",
      FullBuldingAdress: "project.FullBuldingAdress",
      ProjectClosingDate: "project.ProjectClosingDate",
      CommonApproximateConstructionEstimate:
        "project.CommonApproximateConstructionEstimate",
      LoginCustomer: "users1.Login",
      LoginAdministrator: "users3.Login",
    };

    let url = `SELECT project.ID, users1.Login as LoginCustomer, users2.Login as LoginContactor,customer.PhoneNumber as PhoneCustomer, users1.Email as CustomerEmail ,users3.Email as AdminEmail, project.CommonApproximateConstructionEstimate, project.Status, users3.Login as LoginAdministrator, project.ProjectClosingDate,project.FullBuldingAdress
                FROM project
                INNER JOIN customer on project.Customer_ID = customer.ID
                INNER JOIN users as users1 on customer.UserId = users1.ID
                LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID
                LEFT JOIN users  as users2 on contractor.UserId = users2.ID
                LEFT JOIN administrator on project.Administrator_ID = administrator.ID
                LEFT JOIN users as users3 on administrator.UserId = users3.ID Where users2.ID = ${id}  AND (`;
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
      res.json(result);
    });
  }

  async projectCustPage(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      id,
    } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From project INNER JOIN customer on project.Customer_ID = customer.ID INNER JOIN users as users1 on customer.UserId = users1.ID Where users1.ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async projectStatus(req, res) {
    const { id } = req.query;
    db.query(`SELECT Status FROM project WHERE ID = ${id}`, (err, result) => {
      res.json(result[0]);
    });
  }

  async projectCust(req, res) {
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
      Status: "project.Status",
      LoginContactor: "users2.Login",
      FullBuldingAdress: "project.FullBuldingAdress",
      ProjectClosingDate: "project.ProjectClosingDate",
      CommonApproximateConstructionEstimate:
        "project.CommonApproximateConstructionEstimate",
      LoginCustomer: "users1.Login",
      LoginAdministrator: "users3.Login",
    };

    let url = `SELECT project.ID, contractor.PhoneNumber as ContractorPhoneNumberm, users2.Email as ContractorEmail, users1.Login as LoginCustomer, users2.Login as LoginContactor, project.CommonApproximateConstructionEstimate, project.Status, users3.Login as LoginAdministrator,users3.Email as EmailAdmin, project.ProjectClosingDate,project.FullBuldingAdress
                FROM project
                LEFT JOIN customer on project.Customer_ID = customer.ID
                LEFT JOIN users as users1 on customer.UserId = users1.ID
                LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID
                LEFT JOIN users  as users2 on contractor.UserId = users2.ID
                LEFT JOIN administrator on project.Administrator_ID = administrator.ID
                LEFT JOIN users as users3 on administrator.UserId = users3.ID Where users1.ID = ${id}  AND (`;
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
      res.json(result);
    });
  }

  async projectContPage(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      id,
    } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From project LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID LEFT JOIN users  as users2 on contractor.UserId = users2.ID Where users2.ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async getprojectBySearchContractorPage(req, res) {
    const { id } = req.query;

    db.query(`SELECT * FROM contractor WHERE UserId =${id}`, (err, result) => {
      db.query(
        `SELECT Count(*) As pagesNumber From project
                      LEFT JOin offeredcontractors on project.ID = Project_ID
                     Where Status=2 and  Contractor_ID <> ${result[0].ID}`,
        (err, result) => {
          res.json(result);
        }
      );
    });
  }

  async getprojectBySearchContractor(req, res) {
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
      Status: "project.Status",
      LoginContactor: "users2.Login",
      FullBuldingAdress: "project.FullBuldingAdress",
      ProjectClosingDate: "project.ProjectClosingDate",
      CommonApproximateConstructionEstimate:
        "project.CommonApproximateConstructionEstimate",
      LoginCustomer: "users1.Login",
      LoginAdministrator: "users3.Login",
    };

    db.query(
      `SELECT * FROM contractor WHERE contractor.UserId =${id}`,
      (err, result) => {
        let url = `SELECT project.ID, users1.Login as LoginCustomer,customer.PhoneNumber as PhoneCustomer, users1.Email as CustomerEmail ,users3.Email  as AdminEmail, users2.Login as LoginContactor, project.CommonApproximateConstructionEstimate, project.Status, users3.Login as LoginAdministrator, project.ProjectClosingDate,project.FullBuldingAdress
                FROM project
                INNER JOIN customer on project.Customer_ID = customer.ID
                INNER JOIN users as users1 on customer.UserId = users1.ID
                LEFT JOIN contractor on project.ApprovedContractor_ID = contractor.ID
                LEFT JOIN users  as users2 on contractor.UserId = users2.ID
                LEFT JOIN administrator on project.Administrator_ID = administrator.ID
                LEFT JOIN users as users3 on administrator.UserId = users3.ID
                LEFT JOin offeredcontractors on project.ID = offeredcontractors.Project_ID
                Where project.Status=2 And (offeredcontractors.Contractor_ID <> ${result[0].ID} OR offeredcontractors.Contractor_ID is null) AND ( `;
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
          res.json(result);
        });
      }
    );
  }

  async updateProject(req, res) {
    const { ID, Status, idAdmin } = req.body;
    let date = null;
    if (Status == 5) {
      const Datenow = new Date();
      date = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;
    }

    db.query(
      `Select * from administrator WHERE UserId = ${idAdmin}`,
      (err, resultt) => {
        db.query(
          `UPDATE project SET Status=${Status}, ProjectClosingDate=${date}, Administrator_ID =${resultt[0].ID} WHERE ID=${ID}`,
          (err, result) => {
            if (Status == 2) {
              db.query(
                `SELECT * FROM listconstructionworks where Project_ID=${ID}`,
                (err, result) => {
                  if (result.length > 0) {
                    result.map((dat) => {
                      db.query(
                        `UPDATE listconstructionworks SET ManagingAdministrator_ID =${resultt[0].ID}  WHERE ID =${dat.ID}`,
                        (err, result) => {}
                      );
                    });
                  }
                  res.json(result);
                }
              );
            } else {
              res.json(result);
            }
          }
        );
      }
    );
  }

  async projectupcust(req, res) {
    const { ID, CommonApproximateConstructionEstimate, FullBuldingAdress } =
      req.body;

    db.query(
      `UPDATE project SET FullBuldingAdress='${FullBuldingAdress}', CommonApproximateConstructionEstimate=${CommonApproximateConstructionEstimate} WHERE ID=${ID}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async projectInfo(req, res) {
    const { ID, CommonApproximateConstructionEstimate, FullBuldingAdress } =
      req.body;
    db.query(
      `UPDATE project SET CommonApproximateConstructionEstimate=${CommonApproximateConstructionEstimate} FullBuldingAdress='${FullBuldingAdress}' WHERE ID=${ID}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async deleteProject(req, res) {
    const id = req.body.id;

    db.query(`DELETE FROM project WHERE ID = ${id}`, (err, result) => {
      res.json(result);
    });
  }

  async projectConfirm(req, res) {
    const { Project_ID, ContractorSuggestedPrice, Contractor_ID, ID } =
      req.body;
    db.query(
      `UPDATE project set  ApprovedContractor_ID=${Contractor_ID},CommonApproximateConstructionEstimate=${ContractorSuggestedPrice},Status=3 WHERE ID=${Project_ID}`,
      (err, results) => {
        db.query(
          `DELETE FROM offeredcontractors WHERE Project_ID = ${Project_ID}`,
          (err, result) => {
            res.json(result);
          }
        );
      }
    );
  }

  async projectCkeck(req, res) {
    const { id, status } = req.body;
    db.query(
      `SELECT   Count(*) as number FROM listconstructionworks Inner join typeconstructionworks on listconstructionworks.ID = typeconstructionworks.listConstructionWorks_ID WHERE Project_ID=${id}`,
      (err, results) => {
        if (results[0].number > 0) {
          db.query(
            `UPDATE project set  Status=${status} WHERE ID=${id}`,
            (err, results) => {
              res.json(results);
            }
          );
        } else {
          return res.status(400).json({ message: "You dont have List" });
        }
      }
    );
  }
}

module.exports = new ProjectController();
