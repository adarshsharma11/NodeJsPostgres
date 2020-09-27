let express = require('express');
let AuthMiddleware = middleware('app/Middlewares/Auth');
let router = express.Router();
var multer=require('multer');
// File Upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+"."+file.originalname)
  }
});

var upload = multer({ storage: storage });

//category routes
let CategoryController=require('../app/Controllers/Api/CategoryController');
var category = new CategoryController();
router.post('/add-category',[],function(req, res) {
  category.addCategory(req,res);
});
router.get('/list-categories',[],function(req, res) {
  category.categoryListing(req,res);
});
// user Routes
let UserController=require('../app/Controllers/Api/UserController');
var user=new UserController();
router.post('/login', [AuthMiddleware],function(req, res) {
  return user.login(req,res);
});
router.post('/signup',upload.single('profile_image'), [AuthMiddleware],function(req, res) {
  user.signup(req,res);
});

router.post('/verify-mobile-no',function(req, res) {
  user.verifyMobileNo(req,res);
});
router.post('/resend-otp',[],function(req, res) {
    user.sendVerification(req.body.user_id,function(result){
      res.send(result);
    });
});
router.post('/login',[],function(req, res) {
  user.login(req,res);
});

//social login
router.post('/social-login',[],function(req, res) {
  user.socialLogin(req,res);
});
//forgot user password
router.post('/reset-password',[],function(req, res) {
  user.forgotPassword(req,res);
});


// USER ROUTS
router.post('/fetchUserProfile',[],function(req, res) {
  user.fetchUserProfile(req,res);
});
router.post('/updateProfile',[],function(req, res) {
  user.updateProfile(req,res);
});
router.post('/updateProfileImage',upload.single('profile_image'),[],function(req, res) {
  user.updateProfileImage(req,res);
});


//Equip Routes Star
let EquipController=require('../app/Controllers/Api/EquipController');
var Equip = new EquipController();
router.post('/create-equip',[],function(req, res) {
  Equip.createEquip(req,res);
});
router.post('/list-equip',[],function(req, res) {
  Equip.listEquip(req,res);
});
module.exports = router;