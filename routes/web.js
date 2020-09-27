var express = require('express');
var router = express.Router();
let UserController=require('../app/Controllers/Api/UserController');
var user=new UserController();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/reset/:token',[],function(req, res) {
    user.resetPassword(req,res);
});
router.post('/reset-password-now',[],function(req, res) {
    user.resetPasswordNow(req,res);
});
module.exports = router;