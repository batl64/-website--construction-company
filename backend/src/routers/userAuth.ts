import * as Router from 'express';
const router = new Router();
const AuthrController = require('../controler/userAuth.js');

router.post('/login', AuthrController.login)
router.post('/loginPublic', AuthrController.loginPublic)
router.post('/authPublic', AuthrController.authPublic)
router.post('/auth', AuthrController.auth)
router.get('/users', AuthrController.getUsers)
router.get('/usersPage', AuthrController.getOneUsers)
router.delete('/users', AuthrController.deleteUsers)

module.exports = router;