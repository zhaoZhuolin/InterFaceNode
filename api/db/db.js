const appConfig = require("../../appConfig");
const mongodbConfig = appConfig.mongodbConfig;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;


/**
 * 数据库基本操作封装
 */
var db = {};

/**
 * @desc 插入一个文档
 * @param {String}collectionName
 * @param {Object}model
 * @param {db-callback}callback
 */
db.insertOne = function insertOne(collectionName, model, callback) {
    MongoClient.connect(mongodbConfig.url, (err, client) => {
        if (!err) {
            let connection = client.db(mongodbConfig.dbName).collection(collectionName);
            connection.insertOne(model, (err, res) => {
                callback(null, res);
                client.close();
            })
        } else {
            callback(err, null, false);
        }
    })
}

/**
 * @desc 查找一个文档
 * @param {String}collectionName
 * @param {Object}model
 * @param {db-callback}callback
 */
db.find = function find(collectionName, model, callback) {
    MongoClient.connect(mongodbConfig.url, (err, client) => {
        if (!err) {
            let connection = client.db(mongodbConfig.dbName).collection(collectionName);
            connection.find(model).toArray((err, result) => {
                if (err) {
                    console.log(err);
                }
                callback(null, result);
                client.close();
            })
        } else {
            callback(err, null, false);
        }
    })
}


/**
 * @desc 修改一个文档
 */


module.exports = db;