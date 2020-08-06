const model = require('./model');

function addUSer(user){
    const myUser = new model(user);
    return myUser.save();
}
async function getUsers(filterUser){
    let filter = {};
    if(filterUser !== null){
        filter = {
            name:new RegExp(filterUser, "i")
        };
    }
    const users = await model.find(filter);
    return users;
}

module.exports = {
    add: addUSer,
    list: getUsers,
}