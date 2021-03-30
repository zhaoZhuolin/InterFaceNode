const defined = require("../tool/defined");
const defaultValue = require("../tool/defaultValue");
const ColumnType = require("../db/columnType");

/***
 * @param {Object} options
 * @param @{String} options.userName 账号
 * @param @{String} options.password 密码
 * @param @{String} options.salt 密码盐值
 * @param @{String} options.realName 用户真实姓名
 * @param @{String} options.email 邮箱
 */

function UsersInfo(options, forUpdate) {
    options = options ? options : {};
    if (!defined(options.userName)) {
        throw new Error("用户名不能为空");
    }
    if (!defined(options.password)) {
        throw new Error("密码不能为空");
    }
    this.userName = options.userName;
    this.password = options.password;
    this.realName = defaultValue(options.realName, "");
    this.email = defaultValue(options.email, "");
    this.roleId = defaultValue(options.roleId, "");
}

UsersInfo.Definition = {
    table: {
        name: "user",
        nameCn: "用户表",
        userId: "admin",
        description: "用户信息表"
    },
    columns: [{
            name: "userName",
            nameCn: "用户名",
            type: ColumnType.String,
            description: "用户名,账号"
        },
        {
            name: "password",
            nameCn: "密码",
            type: ColumnType.String,
            description: "用户密码"
        }, {
            name: "realName",
            nameCn: "真实姓名",
            type: ColumnType.String,
            description: "用户真实姓名"
        }, {
            name: "email",
            nameCn: "邮箱",
            type: ColumnType.String,
            description: "邮箱"
        },
        {
            name: "roleId",
            nameCn: "角色",
            type: ColumnType.Number,
            description: "用户角色id",
        },
        {
            name: "registerTime",
            nameCn: "注册时间",
            type: ColumnType.Date,
            description: "注册时间",
        },
    ]
}
module.exports = UsersInfo;