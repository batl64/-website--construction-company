import * as Router from "express";
const router = new Router();
const BuildingMaterials = require("../controler/buildingmaterials.js");

router.post("/buildingmaterials", BuildingMaterials.createBuildingMaterials);
router.get(
  "/buildingmaterials",
  BuildingMaterials.getBuildingMaterialsByProject
);
router.get(
  "/buildingmaterialsPage",
  BuildingMaterials.buildingMaterialsProjectPage
);
router.get("/buildingmaterials/:id", BuildingMaterials.getOneBuildingMaterials);
router.put("/buildingmaterials", BuildingMaterials.updateBuildingMaterials);
router.delete("/buildingmaterials", BuildingMaterials.deleteBuildingMaterials);

module.exports = router;
