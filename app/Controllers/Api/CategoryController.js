let Category=require('../../Models/Category');
let fs=require('fs');
const Joi = require('joi');
const Op = require('sequelize').Op

module.exports=class CategoryController{
    //add categories
    addCategory(req,res){
        // Rules for validation
       // console.log('lolz',req.body.title)
        var data={
            title:req.body.title,
        };
        const rules = Joi.object().keys({
            title: Joi.string().required().error(new Error('Please fill category title first!')),
        });

        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }


                Category.create(data).then((category)=>{
                    if (category==null){
                        return res.send({"status":"400","type":"RXERROR","message":"Unable to add category"});
                    }else{
                        return res.send({"status":"200","type":"RXSUCCESS","message":"category added successfully!!!","data":{"cat_id":category.id}});
                    }
                });

            }


//list category
    categoryListing(req,res){

        Category.findAll().then((category)=>{
            if(category==null){
                return res.send({"status":"400","type":"RXERROR","message":"No results found!"});
            }
            else{
                return res.send({"status":"200","type":"RXSUCCESS","message":category.length+" results found!","data":category});

            }


        })

    }

};