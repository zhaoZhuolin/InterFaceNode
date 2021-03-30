const db = require("../db/db");
const ApiResponse = require("../ApiResponse");
const appConfig = require("../../appConfig");
const roleModel = require("./role.Model");

/**
 * @class RoleControll
 * @desc  api Role具体操作
 */
class RoleController {
    static addRole(req, res, next) {
        res.json(req.body);
    }
}

module.exports = RoleController;