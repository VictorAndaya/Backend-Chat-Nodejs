const store = require('./store');

function addUser(name){
    if(!name)
        return Promise.reject('Invalid Name');
    const user = {
        name,
    };
    return store.add(user);
}
function getUser(filterUser){
    return new Promise((resolve,reject) => {
        resolve(store.list(filterUser));
    });
}

module.exports = {
    addUser,
    getUser,
}