/**
 * 将一个时间转换成标准格式日期
 * @param {Date} data 
 * @样式： 2020-01-01
 */
exports.stdData = function(data) {
    var tempdate = new Date(data)
    var y = tempdate.getFullYear()
    var m = tempdate.getMonth() + 1
    var d = tempdate.getDate()
    return y + "-" + m + "-" + d
}


/**
 * 将一个日期转换成标准格式日期时间
 * @param {Date} data 
 * @样式： 2020-01-01 12:00:00
 */
exports.stdDataTime = function(data) {
    var tempdate = new Date(data)
    var y = tempdate.getFullYear()
    var m = (tempdate.getMonth() + 1 + "").padStart("2", "0")
    var d = (tempdate.getDate() + "").padStart("2", "0")
    var h = (tempdate.getHours() + "").padStart("2", "0")
    var min = (tempdate.getMinutes() + "").padStart("2", "0")
    var s = (tempdate.getSeconds() + "").padStart("2", "0")
    console.log("11111")
    console.log(data)
    console.log("2222")
    var newDate = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s
    console.log("3333")
    console.log(newDate)
    return newDate
}