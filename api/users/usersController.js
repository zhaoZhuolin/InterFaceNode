const db = require("../db/db");
const ApiResponse = require("../db/apiResponse");
const appConfig = require("../../appConfig");
const userInfo = require("./users.Model")

/**
 * @class UserControll
 * @desc  api User具体操作
 */
class UserControll {

    static collectionName = "users";

    /**@api /users/login  用户登录 */
    static excuteUserLogin(req, res, next) {
        var apiParams = req.body;
        if (!apiParams.captcha) {
            res.json(new ApiResponse("1", "请输入验证码"));
            return
        }
        if (!req.session.captcha) {
            res.json(new ApiResponse("1", "验证码过期,请刷新验证码"));
            return;
        }
        if (req.session.captcha.toLowerCase() != apiParams.captcha.toLowerCase()) {
            res.json(new ApiResponse("1", "验证码错误"));
            return;
        }
        if (!apiParams.userName || !apiParams.password) {
            res.json(new ApiResponse("1", "请输入用户名和密码"));
            return;
        }
        /**判断是否为超级管理员 */
        if (apiParams.userName == appConfig.admin.uid) {
            if (apiParams.password != appConfig.admin.pwd) {
                res.json(new ApiResponse("1", "请输入正确的用户名和密码"));
                return
            }
        } else {
            //验证用户
            db.find(UserControll.collectionName, {
                userName: req.userName,
                password: req.password
            }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (!result) {
                    res.json(new ApiResponse("1", "用户不存在"));
                } else {
                    res.json(new ApiResponse("1", "用户存在"));
                }
            })
        }
    }

    /**@api /users/register 用户注册 */
    static excuteUserRegister(apiParams, res, next) {
        apiParams = apiParams.body;
        if (!apiParams.userName || !apiParams.password) {
            res.json(new ApiResponse("1", "请输入用户名和密码"));
            return;
        }
        if (apiParams.userName == appConfig.admin.adminName) {
            res.json(new ApiResponse("1", `用户${apiParams.userName}已存在,为超级管理员账号`))
        }
        if (apiParams.password && apiParams.password.split("").length < 6) {
            res.json(new ApiResponse("1", "密码不能少于六位数"));
            return;
        }

        var user = new userInfo(apiParams, true);
        db.find(UserControll.collectionName, {
            userName: user.userName
        }, (err, response) => {
            if (err) {
                console.log(err);
            }
            if (response.length) {
                res.json(new ApiResponse("1", "用户名不能重复"));
            } else {
                user.registerTime = Math.floor(Date.now() / 1000);
                db.insertOne("users", user, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json(new ApiResponse("200", "注册成功"));
                })
            }
        })
    }

}


module.exports = UserControll;