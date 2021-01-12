var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session 中间件
app.use(session({
    secret: 'secret disa', // 对session id 相关的cookie 进行签名
    resave: false,
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 设置 session 的有效时间，单位毫秒
    }
}));
const log4js = require('log4js');
log4js.addLayout('json', function (config) {
    return function (logEvent) {
        return JSON.stringify(logEvent) + config.separator;
    }
});

log4js.configure({
    appenders: {
        logfile: {
            type: 'dateFile',
            filename: __dirname + '/logs/games/',
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            maxLogSize: 102400000,
            backups: 100,
            keepFileExt: true
        },
        display: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['logfile', 'display'],
            level: 'all'
        }
    }
});

const logger = log4js.getLogger('games');
app.use(log4js.connectLogger(logger));


/** 重写console.log,warn,error,trace **/

console._log = console.log;
console.log = function (msg) {
    console._log.apply(null, arguments);
    logger.info(msg);
}
console._warn = console.warn;
console.warn = function (msg) {
    console._warn.apply(null, arguments);
    logger.warn(msg);
}

console._error = console.error;
console.error = function (msg) {
    console._error.apply(null, arguments);
    logger.error(msg);
}

console._trace = console._trace;
console.trace = function (msg) {
    console._trace.apply(null, arguments);
    logger.trace(msg);
}
/* 重写console.log,warn,error,trace **/


const appRouter = require("./api/router");

appRouter.forEach((apiRouter) => {
    app.use(apiRouter.router, require(apiRouter.main));
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})
module.exports = app;