const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.get('/role-match/:userId', roleController.getMatchingRolesByUser);
router.get('/role-trend/:roleId', roleController.getRoleTrend);

module.exports = router;
