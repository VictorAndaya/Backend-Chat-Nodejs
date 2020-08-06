const model = require('./model');
const { populate } = require('./model');

function addMessage(message){
    const myMessage = new model(message);
    myMessage.save();
}

async function getMessages(filterUser){
    return new Promise((resolve,reject) =>{
        let filter = {};
        if(filterUser !== null){
            filter = {
                user:new RegExp(filterUser, "i")
            };
        }
        model.find(filter)
            .populate('user')
            .exec((error, populated) =>{
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populated);
            })
    })
    
}

async function updateText(id, message){
    const foundMessage = await model.findOne({
        _id:id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();

    return newMessage;
}

function removeMessage(id){
    return model.deleteOne({
        _id:id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText:updateText,
    remove:removeMessage,
}