const store = require('./store');

function addChat(users) {
    if (!users || !Array.isArray(users)) {
        console.error('[messageController] No hay datos de usuarios');
        return reject('Los datos son incorrectos');
    }

    const chat = {
        users: users,
    };
    return store.add(chat);
}

function listChats(userId) {
    return store.list(userId);
}

module.exports = {
    addChat,
    listChats,
}