var express = require('express');
var router = express.Router();
var multer  = require('multer');

var uuid = require('uuid/v1');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        var suffix = file.mimetype.split('/').reverse()[0];
        cb(null, uuid() + "." + suffix);
    }
});
var upload = multer({ storage: storage });

router.route('/').post(upload.single('imageFile'), function(req, res, next){
    var file = req.file;
    console.log(req.file);
    var response = {
        code : 0,
        path: file.path
    };
    console.log( response );
    res.end( JSON.stringify( response ) );
});

module.exports = router;