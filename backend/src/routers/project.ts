import * as Router from "express";
const router = new Router();
const ProjectController = require("../controler/project.js");

router.post("/project", ProjectController.createProject);
router.get(
  "/getprojectBySearchContractor",
  ProjectController.getprojectBySearchContractor
);
router.get(
  "/getprojectBySearchContractorPage",
  ProjectController.getprojectBySearchContractorPage
);
router.get("/project", ProjectController.getProject);
router.get("/projectPage", ProjectController.getOneProject);
router.get("/projectDeteils", ProjectController.getProjectDetails);
router.get("/projectCont", ProjectController.projectCont);
router.get("/projectContPage", ProjectController.projectContPage);
router.get("/projectCust", ProjectController.projectCust);
router.get("/projectCustPage", ProjectController.projectCustPage);
router.put("/projectConfirm", ProjectController.projectConfirm);
router.put("/projectCkeck", ProjectController.projectCkeck);
router.get("/projectStatus", ProjectController.projectStatus);
router.put("/project", ProjectController.updateProject);
router.put("/projectInfo", ProjectController.projectInfo);
router.put("/projectupcust", ProjectController.projectupcust);
router.delete("/project", ProjectController.deleteProject);

module.exports = router;
