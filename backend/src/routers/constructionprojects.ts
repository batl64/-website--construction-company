import * as Router from "express";
const router = new Router();
const ConstructionProjects = require("../controler/constructionprojects.js");

router.post(
  "/ConstructionProjects",
  ConstructionProjects.createConstructionProjects
);
router.get(
  "/constructionprojects",
  ConstructionProjects.getConstructionProjectsByProject
);
router.get(
  "/constructionprojects/:id",
  ConstructionProjects.getOneConstructionProjects
);
router.get(
  "/constructionprojectsPage",
  ConstructionProjects.ConstructionProjectstPage
);
router.put(
  "/constructionprojects",
  ConstructionProjects.updateConstructionProjects
);
router.delete(
  "/constructionprojects",
  ConstructionProjects.deleteConstructionProjects
);

module.exports = router;
