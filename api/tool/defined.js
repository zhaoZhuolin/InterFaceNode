/**
 * @param {any}
 * @return {Bollean}
 */
function defined(val) {
    if (typeof val == "undefined" || val == null) {
        return false
    }
    return true
}
module.exports = defined;