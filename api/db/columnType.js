var defined = require("../tool/defined");
var defaultValue = require("../tool/defaultValue");


/***
 * @desc  定义字段(要素) 数据类型 
 */

class ColumnTypeDef {
    static newType(options) {
        options = options ? options : "";
        if (!defined(options.value)) {
            throw new Error("请输入表示新数据类型的值");
        }
        if (!defined(options.text)) {
            throw new Error("请输入表示新数据类型的值");
        }
        this.value = options.value;
        this.text = options.text;
        this.description = defaultValue(this.description, "");
        return options
    }
}
var ColumnType = Object.freeze({
    String: ColumnTypeDef.newType({
        value: "String",
        text: "字符串",
        description: "指示字段值数据类型为字符串"
    }),
    Date: ColumnTypeDef.newType({
        value: "date",
        text: "日期",
        description: "指示字段值数据类型为日期"
    }),
    DateAuto: ColumnTypeDef.newType({
        value: "dateAuto",
        text: "日期（自动填充）",
        description: "指示字段值数据类型为日期，且自动填充为录入时的日期"
    }),
    Datetime: ColumnTypeDef.newType({
        value: "datetime",
        text: "时间",
        description: "指示字段值数据类型为时间"
    }),
    DatetimeAuto: ColumnTypeDef.newType({
        value: "dateAuto",
        text: "时间（自动填充）",
        description: "指示字段值数据类型为时间，且自动填充为录入时的时间"
    }),
    Number: ColumnTypeDef.newType({
        value: "number",
        text: "数字",
        description: "指示字段值数据类型为数字"
    }),
    Array: ColumnTypeDef.newType({
        value: "array",
        text: "数组",
        description: "指示字段值数据类型为数组"
    }),
    Object: ColumnTypeDef.newType({
        value: "object",
        text: "对象",
        description: "指示字段值数据类型为对象（json）"
    }),
    Boolean: ColumnTypeDef.newType({
        value: "boolean",
        text: "布尔",
        description: "指示字段值数据类型为布尔类型，值为true或者false"
    }),
})



module.exports = ColumnType;