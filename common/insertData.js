function insertData(datatest, db, collection, callback) {
    collection.insert(datatest, function(err, result) {
        if (err) {
            console.log("ERROR:" + err)
            return
        }
        callback(result)
    })
}
module.exports = insertData;
