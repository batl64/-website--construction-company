import * as Router from 'express';
const router = new Router();
const TypeConstructionWorksController = require('../controler/typeconstructionworks.js');

router.post('/typeconstructionworks', TypeConstructionWorksController.createTypeConstructionWorks)
/*router.get('/typeconstructionworks', TypeConstructionWorksController.getTypeConstructionWorksByProject)*/
router.get('/typeconstructionworks/:id', TypeConstructionWorksController.getOneTypeConstructionWorks)
router.put('/typeconstructionworks', TypeConstructionWorksController.updateTypeConstructionWorks)
router.delete('/typeconstructionworks', TypeConstructionWorksController.deleteTypeConstructionWorks)

module.exports = router