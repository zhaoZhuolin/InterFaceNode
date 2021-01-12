/**
 * @desc 判断给定字符串是否为undefined，null，空字符串
 */
function isNullOrEmpty(str) {
    return typeof str === 'undefined' ||
        str == null ||
        str.toString().replace(/\s+/g, '') === '';
}