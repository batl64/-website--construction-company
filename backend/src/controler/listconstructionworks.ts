import db from "../db.js";

class ListConstructionWorksController {
  async createListConstructionWorks(req, res) {
    const {
      TypeWork,
      ScopeWork,
      ApproximateConstructionEstimate,
      PlaceConstructionWorks,
      pojectId,
    } = req.body;

    const Datenow = new Date();
    const DateCreation = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;
    db.query(
      `Select ID  FROM listconstructionworks Where Project_ID=${pojectId}`,
      (err, results) => {
        if (results[0] == null) {
          db.query(
            `INSERT INTO listconstructionworks(  Project_ID, ManagingAdministrator_ID, DateCreation) VALUES (${pojectId},${null},${DateCreation})`,
            (err, result) => {
              db.query(
                `INSERT INTO typeconstructionworks( TypeWork, ScopeWork, ApproximateConstructionEstimate, PlaceConstructionWorks,listConstructionWorks_ID ) VALUES ('${TypeWork}','${ScopeWork}',${ApproximateConstructionEstimate},'${PlaceConstructionWorks}',${result.insertId})`,
                (err, result) => {
                  res.send(result);
                }
              );
            }
          );
        } else {
          db.query(
            `INSERT INTO typeconstructionworks( TypeWork, ScopeWork, ApproximateConstructionEstimate, PlaceConstructionWorks,listConstructionWorks_ID ) VALUES ('${TypeWork}','${ScopeWork}',${ApproximateConstructionEstimate},'${PlaceConstructionWorks}',${results[0].ID})`,
            (err, result) => {
              res.send(result);
            }
          );
        }
      }
    );
  }
  async getListConstructionWorksByProject(req, res) {
    db.query(
      `SELECT Count(*) As pagesNumber From listconstructionworks`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  //
  async getOneListConstructionWorks(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      projectId,
    } = req.query;

    let url = `SELECT listconstructionworks.ManagingAdministrator_ID, listconstructionworks.Project_ID,
            listconstructionworks.DateCreation,
            typeconstructionworks.TypeWork, typeconstructionworks.ScopeWork,
            typeconstructionworks.ApproximateConstructionEstimate, typeconstructionworks.PlaceConstructionWorks FROM listconstructionworks
        INNER JOIN typeconstructionworks on typeconstructionworks.listConstructionWorks_ID = listconstructionworks.ID Where listconstructionworks.Project_ID=${projectId} AND (`;
    const ser = searchFields.split(",");
    ser.map((dat, idx) => {
      url += `${dat} like '%${search}%' `;
      if (idx < ser.length - 1) {
        url += ` OR `;
      }
    });

    url += `) ORDER  BY ${orederFild} ${orderDirection} `;
    url += `Limit ${pageSize} `;
    url += `OFFSET ${pageSize * pageNumber}`;

    db.query(url, (err, result) => {
      res.send(result);
    });
  }

  async listconstructionworksProjectPage(req, res) {
    const { pojectId } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From listconstructionworks Where Project_ID=${pojectId}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  //
  async listconstructionworksProject(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      pojectId,
    } = req.query;

    let url = `SELECT typeconstructionworks.ID as TypeworkID, listconstructionworks.ManagingAdministrator_ID, listconstructionworks.Project_ID,
            listconstructionworks.DateCreation,
            typeconstructionworks.TypeWork, typeconstructionworks.ScopeWork,
            typeconstructionworks.ApproximateConstructionEstimate, typeconstructionworks.PlaceConstructionWorks FROM listconstructionworks
        INNER JOIN typeconstructionworks on typeconstructionworks.listConstructionWorks_ID = listconstructionworks.ID Where Project_ID=${pojectId} AND (`;
    const ser = searchFields.split(",");
    ser.map((dat, idx) => {
      url += `${dat} like '%${search}%' `;
      if (idx < ser.length - 1) {
        url += ` OR `;
      }
    });

    url += `) ORDER  BY ${orederFild} ${orderDirection} `;
    url += `Limit ${pageSize} `;
    url += `OFFSET ${pageSize * pageNumber}`;

    db.query(url, (err, result) => {
      res.send(result);
    });
  }

  async updateListConstructionWorks(req, res) {
    const {
      TypeConstructionWorks_ID,
      Project_ID,
      ManagingAdministrator_ID,
      DateCreation,
      ID,
    } = req.body;
    db.query(
      `UPDATE listconstructionworks SET TypeConstructionWorks_ID=${TypeConstructionWorks_ID},Project_ID=${Project_ID}, ManagingAdministrator_ID=${ManagingAdministrator_ID},DateCreation=${DateCreation} WHERE ID = ${ID}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async deleteListConstructionWorks(req, res) {
    const id = req.body.id;

    db.query(
      `DELETE FROM listconstructionworks WHERE ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
}

module.exports = new ListConstructionWorksController();
