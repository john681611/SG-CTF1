const express = require('express');
const router = new express.Router();
const users = require('./page/users.json');
const guns = require('./page/guns.json');
const DOMAIN = 'jh_awesome_ctf.herokuapp.com'

router.get('/', function (req, res) {
    res.renderMin('index.ejs', {});
});

router.get('/forgot', function (req, res) {
    res.renderMin('forgot.ejs', {});
});

router.post('/reset', function (req, res) {
    if(req.body['g-recaptcha-response'] != '' && req.body.user){
        return res.renderMin('reset.ejs', {name:req.body.user});
    }
    res.redirect('/forgot');
});


router.get('/member/:user', function (req, res) {
    const loginFlag = req.query.logged? "FLAG:":"";
    const member = users.find(user => user.user === req.params.user)
    res.renderMin('member.ejs', {loginFlag: loginFlag, member: member});
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

router.post('/search', function (req, res) {
  resulting_guns = guns
    result = eval(req.body['super_safe_query']);
console.log(result);
    if (guns.find(gun=>gun.gun===result)) {
      resulting_guns = result
    }
    res.renderMin('results.ejs', {guns: resulting_guns});
});

module.exports = {
    router
};
