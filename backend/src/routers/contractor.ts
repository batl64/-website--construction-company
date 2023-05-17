import * as Router from 'express';
const router = new Router();
const ContractorController = require('../controler/contractor.js');

router.post('/contractor', ContractorController.createContractor)
router.get('/contractor', ContractorController.getContractor)
router.get('/contractorPage', ContractorController.getOneContractor)
router.put('/contractor', ContractorController.updateContractor)
router.delete('/contractor', ContractorController.deleteContractor)

module.exports = router