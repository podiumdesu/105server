var query = require("./query")
var update = function update(db, col, oldData, replaceData, callback) {
    //query(db, col, {"password": oldData.password})
    col.update(oldData, {$set: replaceData}, function(err, result) {
        if (err) {
            console.log("ERROR: " + err)
            callback(-1)
        }
        //console.log(result)
        callback(1)
        //callback(result)
    })
}

module.exports = update
