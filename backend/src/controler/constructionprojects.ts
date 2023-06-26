import db from "../db.js";

class ConstructionProjects {
  async createConstructionProjects(req, res) {
    const { Project_ID, nameConstruction, description, FullBuldingAdress } =
      req.body;
    const Datenow = new Date();
    const DataCreation = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;
    db.query(
      `INSERT INTO constructionprojects( Project_ID, DataCreation, nameConstruction, description,FullBuldingAdress	
        )VALUES (${Project_ID},${DataCreation},'${nameConstruction}','${description}','${FullBuldingAdress}')`,
      (err, result) => {
        res.status(200).json({ message: "Construction creacte" });
      }
    );
  }

  async getConstructionProjectsByProject(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      pojectId,
    } = req.query;
    let url = `SELECT * FROM constructionprojects WHERE Project_ID = ${pojectId} AND (`;
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

  async ConstructionProjectstPage(req, res) {
    const { pojectId } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From constructionprojects Where Project_ID=${pojectId}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async getOneConstructionProjects(req, res) {
    const id = req.params.id;
    db.query(
      `SELECT * FROM constructionprojects WHERE id = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async updateConstructionProjects(req, res) {
    const { ID, nameConstruction, description, FullBuldingAdress } = req.body;

    db.query(
      `UPDATE constructionprojects SET nameConstruction='${nameConstruction}',description='${description}',FullBuldingAdress='${FullBuldingAdress}'	 WHERE ID=${ID}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async deleteConstructionProjects(req, res) {
    const id = req.body.id;
    db.query(
      `DELETE FROM constructionprojects WHERE ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
}

module.exports = new ConstructionProjects();
