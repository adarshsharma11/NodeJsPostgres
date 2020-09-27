let User=require('../../Models/User');
let fs=require('fs');
const Joi = require('joi');
let { sendMessageTwilio }=require('../../../services/twilio');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const Op = require('sequelize').Op
const ejs = require("ejs");
const crypto = require('crypto');
// configure email credentials

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adarsh.codetribe@gmail.com',
        pass: 'codetribe#wrc'
    }
});

module.exports=class UserController{

    /**
     * User Login functionality
     *
     * @param req
     * @param res
     */
    login(req,res){
   //console.log('login function called')
        // Rules for validation
        const rules = Joi.object().keys({
            email: Joi.string().email().required().error(new Error('Please fill the correct email first!')),
            password:Joi.string().required().error(new Error('Please fill the password first!'))
        });
        // Validate the request
        const result = Joi.validate(req.body, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }

        User.findOne({ where:{ email: req.body.email,login_type:'N' }}).then((user)=>{

            if(user==null){
               return res.send({"status":"400","type":"RXERROR","message":"No user found!!!"});
            }
            if(typeof user.email=="undefined"){
               return res.send({"status":"400","type":"RXERROR","message":"Login credentials not matched!!!"});
            }



            if (!user.validPassword(req.body.password)) {
                return res.send({"status":"400","type":"RXERROR","message":"Login credentials not matched!!!"});
            } else {

                let data={
                    "user_id":user.id,
                    "is_profile_completed" : user.status
                };


                return res.send({"status":"200","type":"RXSUCCESS","message":"Login successfully","data":data});
            }

        });

    }


    /**
     *   user Sign-up functionality
     *
     * @param req
     * @param res
     */
   signup(req,res){
        // Rules for validation
        const rules = Joi.object().keys({
            email: Joi.string().email().required().error(new Error('Please fill the correct email first!')),
            password:Joi.string().required().error(new Error('Please fill the password first!'))
        });

        // Validate the request
        const result = Joi.validate(req.body, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;

            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }

        var alreadyExists=0;
        User.findOne({where:{ 'email':req.body.email}}).then((user)=>{

          // Check user Already Exists
          if(user==null){
                  var data={
                      email:req.body.email,
                      password:req.body.password,
                      login_type:'N'
                  };

                 User.create(data).then((user)=>{
                      if (user==null){
                          return res.send({"status":"400","type":"RXERROR","message":"Unable to register"});
                      }else{
                          return res.send({"status":"200","type":"RXSUCCESS","message":"user registered successfully!!!","data":{"user_id":user.id}});
                      }
                  });

           }else{
              return  res.send({"status":"200","type":"RXERROR","message":"Email already exists."});
          }

      });

    }


    fetchUserProfile(req,res){
        let userId=req.body.user_id;
        const rules = Joi.object().keys({
            user_id: Joi.string().required().error(new Error('Please fill userId first!'))
        });

        // Validate the request
        const result = Joi.validate(userId, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        User.findOne({where:{ 'id':userId}}).then((result)=>{

            // Check user exists or not
            if(result==null){
                // Return CallBack Failure to closure
                res.send({"status":"400","type":"RXERROR","message":"No user found"});
            }

                let data={
                    "user_id": result._id,
                    "email": result.email,
                    "first_name": result.first_name,
                    "last_name": result.last_name,
                    "phone_no": result.phone_no,
                    "profile_image": result.profile_pic,
                    "lat": result.lat,
                    "lng": result.lng
                };

                res.send({"status":"200","type":"RXSUCCESS","message":"user profile data","data":data});
        });
    }
    
    updateProfile(req,res){
        let data=req.body;
        const rules = Joi.object().keys({
            user_id: Joi.string().required().error(new Error('Please fill userId first!'))
        });

        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }

        // dd(data);

        User.findOne({ where :{'id':data.user_id}}).then((user)=>{
            // Check user Already Exists
            if(user!=null){

                User.update(data, { where: {'id':data.user_id} }).then(()=>{
                    res.send({"status":"200","type":"RXSUCCESS","message":"Profile updated successfully"});
                });

            }else{
                res.send({"status":"200","type":"RXERROR","message":"No user found!!!"});
            }

        });
    }
    updateProfileImage(req,res){

        if(typeof req.file =="undefined" || req.file.filename ==""){
            return res.send({"status":"400","type":"RXERROR","message":"Profile pic is required."});
        }

        // Rules for validation
        const rules = Joi.object().keys({
            user_id: Joi.string().required().error(() => {
                return {
                    message: 'userId is required',
                };
            })
    });

        // Validate the request
        const result = Joi.validate(req.body, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        User.findOne({where:{ 'id':req.body.user_id}}).then((resp)=>{
           // console.log(resp.profile_pic,'info data')
            if(resp==null){
              return  res.send({"status":"400","type":"RXERROR","message":"can't update profile pic"});
            }


            // Check user Already Exists
          //  if(typeof resp.profile_pic!="undefined"  ){
                var data={
                    profile_pic:req.file.filename
                };

                // Unlink the image
              /*  fs.unlink("public/uploads/"+resp.profile_image,function(err){
                    if(err) console.log(err);
                });*/
                // Update the user
            User.update(
               data,
                {returning: true, where: {id: req.body.user_id} }
            )
                .then((result)=>{
                    res.send({"status":"200","type":"RXSUCCESS","message":"Profile pic updated successfully","data":{"profile_image":req.file.filename}});

                })
                .catch((err)=>{
                    res.send({"status":"400","type":"RXERROR","message":err.message});
                });

        });
    }

    //social login sign up
    socialLogin(req,res){
       let data = req.body
        const rules = Joi.object().keys({
            email: Joi.string().email().allow('').error(new Error('Please fill the correct email first!')),
            login_type: Joi.string().valid('F', 'G').required().error(new Error('Please fill the correct login_type first(hint:F for facebook & G for google)')),
        });

        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        if(data.login_type == 'G' && data.google_id == ''  ){
            return res.send({"status":"400","type":"RXERROR","message":'please fill google id first'});
        }
        else if (data.login_type == 'F' && data.facebook_id == ''  ){
            return res.send({"status":"400","type":"RXERROR","message":'please fill facebook id first'});

        }
        User.findOne({ where: {
                [Op.or]: [{google_id: data.google_id,login_type:'G'}, {facebook_id: data.facebook_id,login_type:'F'}]
            }}).then((user)=>{
       if(user ==null){
           User.create(data).then((Registereduser)=>{
               if (Registereduser==null){
                   return res.send({"status":"400","type":"RXERROR","message":"Unable to register"});
               }else{
                   return res.send({"status":"200","type":"RXSUCCESS","message":"user registered successfully!!!","data":{"user_id":Registereduser.id,"is_profile_completed":Registereduser.status}});
               }
           });

       }
       else{
           let resData={
               "user_id":user.id,
               "is_profile_completed" : user.status
           };
           return res.send({"status":"200","type":"RXSUCCESS","message":"Login successfully","data":resData});
       }

            })
   }

   //forgot password api
    forgotPassword(req,res){

        const rules = Joi.object().keys({
            email: Joi.string().email().required().error(new Error('Please fill the correct email first!')),
        });
let data = {
    email:req.body.email
}
        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        User.findOne({where:{ 'email':req.body.email,'login_type':'N'}}).then((user)=>{
            if(user==null){
                // Return CallBack Failure to closure
                res.send({"status":"400","type":"RXERROR","message":"No user found"});
            }
            let token = crypto.randomBytes(32).toString('hex')
            let updateToken = {
                remember_token: token
            }
            ejs.renderFile(__dirname + "/../../../resources/views/email_template.ejs", { token: token }, function (err, data) {
                if (err) {
                    console.log(err);
                }

                let mailOptions = {
                    from: 'contact@codetribesolutions.com',
                    to: req.body.email,
                    subject: 'Reset Password Email',
                    html: data
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        User.update(
                            updateToken,
                            {returning: true, where: {email: req.body.email} }
                        )
                            .then((result)=>{
                                res.send({"status":"200","type":"RXSUCCESS","message":"Reset passwork link send successfully"});

                            })
                            .catch((err)=>{
                                res.send({"status":"400","type":"RXERROR","message":err.message});
                            });
                    }
                });
            });






        })


    }

    //open reset password page in browser
    //show reset page on browser
    resetPassword(req,res){
        let token = req.params.token;
       // console.log(token)
        res.render('reset-password.ejs', {
            title:'change your password',
            token:token,
        });
    }
//reset password from front end
    resetPasswordNow(req,res){

        let token = req.body.token;
        const rules = Joi.object().keys({
            'password': Joi.string().required().error(new Error('Please fill the correct password first!')),
            'c_password': Joi.string().valid(Joi.ref('password')).required().error(new Error('Fill confirm password first and must same as password'))
        });
        let data = {
            password:req.body.password,
            c_password:req.body.c_password
        }
        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            req.flash('error', error.message);
            res.redirect('back');
        }

        User.findOne({where:{ 'remember_token':token,'login_type':'N'}}).then((user)=>{
        if(user==null){
            req.flash('error', 'invalid or expired session please resend reset password link again.')
            res.redirect('back');
        }else {
            let passUpdate = {
                password: req.body.password,
                remember_token: null
            }
            User.update(
                passUpdate,
                {returning: true, where: {id: user.id}}
            )
                .then((result) => {
                    req.flash('success', 'password reset successfully!')
                    res.redirect('back');
                }).catch((err) => {
                req.flash('error', 'something went wrong!')
                res.redirect('back');
            });
        }
        })
   }
};