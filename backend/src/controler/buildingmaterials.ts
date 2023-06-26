import db from "../db.js";

class BuildingMaterials {
  async createBuildingMaterials(req, res) {
    const {
      Project_ID,
      buildingMaterials,
      cost,
      supplierBuildingMaterials,
      volume,
    } = req.body;

    const Datenow = new Date();
    const DataCreation = `'${Datenow.getFullYear()}-${Datenow.getMonth()}-${Datenow.getDate()} ${Datenow.getHours()}:${Datenow.getMinutes()}:${Datenow.getSeconds()}'`;

    db.query(
      `INSERT INTO buildingmaterials(Project_ID, DataCreation, buildingMaterials, cost,supplierBuildingMaterials,volume) VALUES (${Project_ID},${DataCreation},'${buildingMaterials}',${cost},'${supplierBuildingMaterials}','${volume}')`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ message: "Build material creacte" });
      }
    );
  }

  async getBuildingMaterialsByProject(req, res) {
    const {
      orderDirection,
      orederFild,
      pageSize,
      pageNumber,
      search,
      searchFields,
      pojectId,
    } = req.query;
    let url = `SELECT * FROM buildingmaterials WHERE Project_ID = ${pojectId} AND (`;
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

  async buildingMaterialsProjectPage(req, res) {
    const { pojectId } = req.query;
    db.query(
      `SELECT Count(*) As pagesNumber From buildingmaterials Where Project_ID=${pojectId}`,
      (err, result) => {
        res.json(result);
      }
    );
  }

  async getOneBuildingMaterials(req, res) {
    const id = req.params.id;
    db.query(
      `SELECT * FROM buildingmaterials WHERE id = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
  async updateBuildingMaterials(req, res) {
    const { ID, buildingMaterials, cost, supplierBuildingMaterials, volume } =
      req.body;

    db.query(
      `UPDATE buildingmaterials SET 	supplierBuildingMaterials=${supplierBuildingMaterials},volume=${volume},buildingMaterials=${buildingMaterials},cost=${cost} WHERE ID=${ID}`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json(result);
      }
    );
  }
  async deleteBuildingMaterials(req, res) {
    const id = req.body.id;
    db.query(
      `DELETE FROM buildingmaterials WHERE ID = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  }
}

module.exports = new BuildingMaterials();
