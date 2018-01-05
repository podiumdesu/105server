var hellod = function hello(db, col, queryData, callback) {
    col.find(queryData).toArray(function(err, result) {
        if (err) {
            console.log("ERROR: " + err)
            callback(-1)
        }
        if (result.length === 0) {
            console.log("info from query.js: ***NOT found***")
            callback(0)
        } else {
            console.log("info from query.js: ***FOUND***")
            //console.log(result.ok)
            callback(1)
        }
        //callback(result)
    })
}

module.exports = hellod
