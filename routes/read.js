var express = require('express');
var router = express.Router();
var fs = require("fs");

router.route('/*').get(function(req, res, next){
    var imagePath = req.query.imagePath;
    console.log(req)
    fs.readFile(imagePath, function(err, data){
        res.end(data)
    });
})

module.exports = router;