import * as Router from 'express';
const router = new Router();
const ListConstructionWorksController = require('../controler/listconstructionworks.js');

router.post('/listconstructionworks', ListConstructionWorksController.createListConstructionWorks)
router.get('/listconstructionworks', ListConstructionWorksController.getOneListConstructionWorks)
router.get('/listconstructionworksPage', ListConstructionWorksController.getListConstructionWorksByProject)
router.get('/listconstructionworksProject', ListConstructionWorksController.listconstructionworksProject)
router.get('/listconstructionworksProjectPage', ListConstructionWorksController.listconstructionworksProjectPage)
router.put('/listconstructionworks', ListConstructionWorksController.updateListConstructionWorks)
router.delete('/listconstructionworks', ListConstructionWorksController.deleteListConstructionWorks)

module.exports = router