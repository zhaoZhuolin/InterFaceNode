var express = require('express');
var router = express.Router();
const UserControll = require("./usersController");
var svgCaptcha = require('svg-captcha');

/**
 * @api  
 * @apiGroup users
 */

/**
 *@api /users/register
 *@desc  用户注册
 */
router.post('/register', UserControll.excuteUserRegister);

/**
 *@api /users/register
 *@desc  用户登录
 */
router.post('/login', UserControll.excuteUserLogin);
// router.post('/login', function (req, res, next) {
//     console.log(req.session.captcha);
//     res.json({});
// });


/**
 *@api  /users/captche
 *@desc  获取svg格式验证码 保存session,登录时作比较
 */
router.get("/captche", function (req, res, next) {
    var captcha = svgCaptcha.create({
        color: true,
        size: 4
    });

    req.session['captcha'] = captcha.text;
    res.type("svg");
    console.log(req.session);
    res.status(200).send(captcha.data);
})
module.exports = router;