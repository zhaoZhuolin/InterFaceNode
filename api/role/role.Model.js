const ColumnType = require("../db/schema/column/ColumnType");
const uuid = require("uuid");

/***
 * @param {Object} options
 * @param @{String} options.roleName 角色名称
 * @param @{String} options.description 角色说明
 * @param @{String} options.roleId 角色ID  
 * @param @{Array} options.permissions 角色权限
 * 
 */
function Role(options) {
    this.roleName = options.roleName;
    this.description = options.description;
    this.roleId = options.roleId ? options.roleId : uuid.v1();
    this.permissions = options.permissions ? options.permissions : [];
}

Role.Definition = {
    table: {
        name: "role",
        nameCn: "角色表",
        userId: "admin",
        description: "角色信息表"
    },
    columns: [{
        name: "roleName",
        nameCn: "角色名称",
        type: ColumnType.String,
        description: "角色名称"
    }, {
        name: "description",
        nameCn: "说明",
        type: ColumnType.String,
        description: "角色说明"
    }, {
        name: "roleId",
        nameCn: "角色id",
        type: ColumnType.String,
        description: "角色id"
    }, {
        name: "permissions",
        nameCn: "权限",
        type: ColumnType.Array,
        description: "角色权限"
    }]
}
module.exports = Role;