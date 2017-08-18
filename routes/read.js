var express = require('express');
var router = express.Router();
var fs = require("fs");
var images = require("images");

router.route('/*').get(function(req, res, next){
    if (req.url === '/favicon.ico') {
        res.end('')
        return false;
    }

    var imagePath = 'uploads' + req.path;

    fs.exists(imagePath, function (exists){
        if (!exists) {
            readImage('./public/images/no-pic-100.png', res, req)
        } else {
            readImage(imagePath, res, req);
        }
    });
})

function readImage(imagePath, res, req) {
    fs.readFile(imagePath, function(err, data){
        if (err) {
            console.error(err);
            fs.readFile('./public/images/no-pic-100.png', function(err, data){
                res.end(data);
            });
        }
        var params = req.query;
        var newImage;
        if (params.h && params.w) {
            newImage = images(data).resize(Number(params.w), Number(params.h)).encode("jpg", { operation: 50 });
        } else if (params.h) {
            newImage = images(data).resize(null, Number(params.h)).encode("png", { operation: 50 });
        } else if (params.w) {
            newImage = images(data).resize(Number(params.w)).encode("png", { operation: 50 });
        } else {
            newImage = data;
        }
        res.end(newImage);
    });
}

module.exports = router;