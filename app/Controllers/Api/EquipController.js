let Equip=require('../../Models/Equip');
let User=require('../../Models/User');
const Joi = require('joi');
const Op = require('sequelize').Op

module.exports=class EquipController{

    //add new equipments
    createEquip(req,res){


        let body = req.body
        // Rules for validation
        const rules = Joi.object().keys({
            user_id: Joi.string().required().error(new Error('Please fill the user Id first!')),
            vin_no: Joi.string().required().error(new Error('Please fill the VIN number first!')),
            make: Joi.string().required().error(new Error('Please fill the make first!')),
            model: Joi.string().required().error(new Error('Please fill the model first!')),
            year: Joi.string().required().error(new Error('Please fill the year first!')),
            feature: Joi.string().required().error(new Error('Please fill the feature first!')),
            description: Joi.string().required().error(new Error('Please fill the description first!')),
            address: Joi.string().required().error(new Error('Please fill the address first!')),
            lat: Joi.string().required().error(new Error('Please fill the lat first!')),
            lng: Joi.string().required().error(new Error('Please fill the long first!')),
            city: Joi.string().required().error(new Error('Please fill the city first!')),
            country: Joi.string().required().error(new Error('Please fill the country first!')),
            postal_code: Joi.string().required().error(new Error('Please fill the postal_code first!')),
            renter_pickup_return: Joi.string().valid('0', '1').required().error(new Error('Please fill the renter_pickup_return first!(Hint:0,1)')),
            owner_pickup_return: Joi.string().valid('0', '1').required().error(new Error('Please fill the owner_pickup_return first!(Hint:0,1)')),
            third_party_pickup_return: Joi.string().valid('0', '1').required().error(new Error('Please fill the third_party_pickup_return first!(Hint:0,1)')),
            max_miles: Joi.string().required().error(new Error('Please fill the max_miles first!')),
            additional_miles_fee: Joi.string().required().error(new Error('Please fill the additional_miles_fee first!')),
            price_half_day: Joi.string().required().error(new Error('Please fill the price_half_day first!')),
            price_day: Joi.string().required().error(new Error('Please fill the price_day first!')),
            price_month: Joi.string().required().error(new Error('Please fill the price_month first!')),
            included_hrs_day: Joi.string().required().error(new Error('Please fill the included_hrs_day first!')),
            additional_hour_charge: Joi.string().required().error(new Error('Please fill the additional_hour_charge first!')),
            start_date: Joi.string().required().error(new Error('Please fill the start_date first!')),
            end_date: Joi.string().required().error(new Error('Please fill the end_date first!')),
            end_time: Joi.string().required().error(new Error('Please fill the end_time first!')),
            pause: Joi.string().valid('0', '1').required().error(new Error('Please fill the pause first!(Hint:0,1)')),
            sunday: Joi.string().valid('0', '1').required().error(new Error('Please fill the sunday first!(Hint:0,1)')),
            weekends: Joi.string().valid('0', '1').required().error(new Error('Please fill the weekends first!(Hint:0,1)')),
        });
        var data = {
            user_id:body.user_id,
            vin_no:body.vin_no,
            make: body.make,
            model: body.model,
            year: body.year,
            feature: body.feature,
            description: body.description,
            address: body.address,
            lat: body.lat,
            lng: body.lng,
            city: body.city,
            country: body.country,
            postal_code: body.postal_code,
            renter_pickup_return: body.renter_pickup_return,
            owner_pickup_return: body.owner_pickup_return,
            third_party_pickup_return: body.third_party_pickup_return,
            max_miles: body.max_miles,
            additional_miles_fee: body.additional_miles_fee,
            price_half_day: body.price_half_day,
            price_day: body.price_day,
            price_month: body.price_month,
            included_hrs_day: body.included_hrs_day,
            additional_hour_charge: body.additional_hour_charge,
            start_date: body.start_date,
            end_date: body.end_date,
            end_time:body.end_time,
            pause: body.pauseStatus,
            sunday: body.sunday,
            weekends: body.weekends,
        };

        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        User.findOne({ where:{ id: body.user_id }}).then((user)=> {
            if(user == null){
                return res.send({"status":"400","type":"RXERROR","message":"No user found!!!"});
            }
            Equip.create(data).then((category) => {
                if (category == null) {
                    return res.send({"status": "400", "type": "RXERROR", "message": "Unable to add category"});
                } else {
                    return res.send({
                        "status": "200",
                        "type": "RXSUCCESS",
                        "message": "Equipment added successfully!!!",
                        "data": {"Equipment_id": category.id}
                    });
                }
            });

        })

    }

    //list all eqipments
    listEquip(req,res){
        let body = req.body
        // Rules for validation
        const rules = Joi.object().keys({
            user_id: Joi.string().required().error(new Error('Please fill the user Id first!')),
        });
        var data = {
            user_id:body.user_id,
        };

        // Validate the request
        const result = Joi.validate(data, rules,{abortEarly: false,allowUnknown: true});
        // Check any error
        if (result.error) {
            const { error } =result;
            return res.send({"status":"400","type":"RXERROR","message":error.message});
        }
        User.findOne({ where:{ id: body.user_id }}).then((user)=> {
            if (user == null) {
                return res.send({"status": "400", "type": "RXERROR", "message": "No user found!!!"});
            }
            Equip.findAll({where:{ user_id: body.user_id }}).then((equip)=>{
                if(equip==null){
                    return res.send({"status":"400","type":"RXERROR","message":"No results found!"});
                }
                else{
                    return res.send({"status":"200","type":"RXSUCCESS","message":equip.length+" results found!",data:equip});
                }
            })
        })
    }
};