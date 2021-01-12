/**
 * @desc 自定义响应结果数据结构
 * @param {Number} code
 * @param {String} msg 
 */
function ApiResponse(code, msg, data) {
    return {
        code: code,
        msg: msg,
        data: data,
    }
}
module.exports = ApiResponse;