/**
 * @param {any}
 * @param {any}
 * @return {any}
 */
function defaultValue(inputVal, defaultValue) {
    if (typeof inputVal == "undefined" || inputVal == null) {
        return defaultValue
    }
    return inputVal;
}
module.exports = defaultValue;