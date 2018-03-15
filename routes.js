const express = require('express');
const router = new express.Router();


router.get('/', function (req, res) {
    res.renderMin('index.ejs', {});
});

router.get('/admin', function (req, res) {
    res.renderMin('edit.ejs', {});
});


module.exports = {
    router
};