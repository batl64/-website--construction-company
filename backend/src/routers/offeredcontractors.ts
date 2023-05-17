import * as Router from 'express';
const router = new Router();
const OfferedContractorsController = require('../controler/offeredcontractors.js');

router.post('/offeredcontractors', OfferedContractorsController.createOfferedContractors)
router.get('/offeredcontractors', OfferedContractorsController.getOfferedContractors)
router.get('/offeredcontractorsPage', OfferedContractorsController.getOneOfferedContractors)
router.get('/offeredcontractorsOnCust', OfferedContractorsController.offeredcontractorsOnCust)
router.get('/offeredcontractorsPageOnCust', OfferedContractorsController.offeredcontractorsPageOnCust)
router.get('/offeredcontractorsUser', OfferedContractorsController.offeredcontractorsUser)
router.get('/offeredcontractorsUserPage', OfferedContractorsController.offeredcontractorsUserPage)
router.delete('/offeredcontractors', OfferedContractorsController.deleteOfferedContractors)

module.exports = router