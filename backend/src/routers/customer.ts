import * as Router from "express";
const router = new Router();
const CustomerController = require("../controler/customer.js");

router.post("/customer", CustomerController.createCustomer);
router.get("/customer", CustomerController.getCustomer);
router.get("/customerPage", CustomerController.getOneCustomer);
router.put("/customer", CustomerController.updateCustomer);
router.delete("/customer", CustomerController.deleteCustomer);

module.exports = router;
