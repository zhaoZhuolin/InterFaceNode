var express = require('express');
var router = express.Router();
var RoleController = require("./roleController");

/**
 * @api  
 * @apiGroup role
 */

/**
 *@api /role/addRole
 *@desc  添加角色
 */
router.post('/addRole', RoleController.addRole);

module.exports = router;