var db = require('../config/mongoose');

var Usermodel = db.model('User', {
    userId: Number,
    name: String,
    headImageUrl: String,
    nickname: String,
    password: String,
    auth_token: String,
    auth_date: Number
});





var UserEntity = new Usermodel({
    userId: 1004,
    name: 'PetnaKanojo',
})
