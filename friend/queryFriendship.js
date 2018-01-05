//
function queryFriendship(db, col, queryData, callback) {
    col.find(queryData).toArray( (err, result) => {
        if (err) {
            console.log("ERROR: " + err)
            callback("-1")
        }
        if (result.length === 0) {
            console.log("info from query.js: ***NOT found***")
            callback("0")
        } else {
            console.log("info from query.js: ***FOUND***")
            callback("1")
        }
    })
}
module.exports = queryFriendship
