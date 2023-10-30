const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/:username', userCtrl.getUser);

module.exports = router;