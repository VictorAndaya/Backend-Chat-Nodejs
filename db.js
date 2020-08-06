const db = require('mongoose');

db.Promise = global.Promise;
async function connect(url){
    
    await db.connect(url, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then((resolve) => {
        console.log('[DB] Success contected');
    })
    .catch((reject) => {
        console.log(`[DB] fail contected ${reject}`);
    });
}
module.exports = connect;
