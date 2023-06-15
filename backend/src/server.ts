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

import { checkDatabaseConnection } from "./db.js";

const express = require("express");
const port = process.env.DB_PORT || 8001;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, data, Authorization"
  );
  next();
});

app.use(checkDatabaseConnection);
app.use(express.json());
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

app.listen(port, () => console.log(`server started on post ${port}`));
