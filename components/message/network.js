const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination : "public/files/",
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get('/', function (req, res){
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((MessageList) => {
        response.success(req,res,MessageList, 200)
    })
    .catch(e =>{
        response.error(req,res, 'Unexpected Error', 500, e)
    })
});

router.post('/',upload.single('file') , function (req, res){
    controller.addMessage(req.body.chat ,req.body.user, req.body.message, req.file)
    .then((fullMessage)=>{
        response.success(req,res, fullMessage,201);
    })
    .catch(e => {
        response.error(req,res, 'Informacion invalida',400);
    });
});

router.patch('/:id', function(req, res){
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) =>{
        response.success(req,res,data,200);
    })
    .catch(e =>{
        response.error(req, res, 'Error Interno', 500, e);
    });
});

router.delete('/:id', function(req, res){
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno ', 500, e);
        })

});

module.exports = router;
