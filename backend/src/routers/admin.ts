import * as Router from 'express';
const router = new Router();
const AdminController = require('../controler/admin.js');

router.post('/admin', AdminController.createAdmin)
router.get('/admin', AdminController.getAdmin)
router.get('/adminPage', AdminController.getOneAdmin)
router.put('/admin', AdminController.updateAdmin)
router.delete('/admin', AdminController.deleteAdmin)

module.exports = router