import * as useRouterAdmin from "./routers/admin.js";
import * as useRouterContractor from "./routers/contractor.js";
import * as useRouterCustomer from "./routers/customer.js";
import * as useRouterUser from "./routers/userAuth.js";
import * as useRouterListConstructionWorksController from "./routers/listconstructionworks.js";
import * as useRouterOfferedContractorsController from "./routers/offeredcontractors.js";
import * as useRouterProjectController from "./routers/project.js";
import * as useRouterTypeConstructionWorksController from "./routers/typeconstructionworks.js";
import * as useRouterSetting from "./routers/setting.js";
import * as useRouterMessages from "./routers/messages.js";
import * as useRouterFile from "./routers/file.js";
import * as useBuildingMaterials from "./routers/buildingmaterials.js";
import * as useConstructionpPojects from "./routers/constructionprojects.js";
import * as useReset from "./routers/reset.js";

import { checkDatabaseConnection } from "./db.js";

const express = require("express");
const cors = require("cors");
const port = process.env.DB_PORT || 8001;
const path = require("path");
const app = express();

app.use(cors());

app.use(checkDatabaseConnection);
app.use(express.json({ extends: true }));
app.use("/file", express.static(path.join(__dirname, "file")));
app.get("/", (req, res) => {
  res.json("api");
});

app.use("/api", useRouterAdmin);
app.use("/api", useRouterUser);
app.use("/api", useRouterContractor);
app.use("/api", useRouterCustomer);
app.use("/api", useRouterListConstructionWorksController);
app.use("/api", useRouterOfferedContractorsController);
app.use("/api", useRouterProjectController);
app.use("/api", useRouterTypeConstructionWorksController);
app.use("/api", useRouterSetting);
app.use("/api", useRouterMessages);
app.use("/api", useRouterFile);
app.use("/api", useBuildingMaterials);
app.use("/api", useConstructionpPojects);
app.use("/api", useReset);

app.listen(port, () => console.log(`server started on post ${port}`));
