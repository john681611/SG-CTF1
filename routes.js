const express = require('express');
const router = new express.Router();
const users = require('./page/users.json');


router.get('/', function (req, res) {
    res.renderMin('index.ejs', {});
});

router.get('/member/:user', function (req, res) {
    console.log(req.query);
    const loginFlag = req.query.logged? "FLAG:":"";
    res.renderMin('member.ejs', {loginFlag: loginFlag});
});

router.post('/member', function (req, res) {
   if(req.body.admin && req.body.role !== 'Admin'){
    return res.send('FLAG:');
   } 
   return res.renderMin('index.ejs', {});
});

router.post('/login', function (req, res) {
    if(req.body.user && req.body.password){
        if(users.find(user => user.user === req.body.user).password == req.body.password){
            if(users.find(user => user.user === req.body.user).admin){
                return  res.renderMin('admin.ejs', {members:users});
            } else {
                 res.redirect(`/member/${req.body.user}?logged=true`);
            }
        }
    }
    res.redirect('/');
});


module.exports = {
    router
};