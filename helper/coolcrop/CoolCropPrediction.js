let moment=require("moment");
let { CropList,MarketList,PredictPrice,DateList,sequelize } = require('./CoolCrop.db');

class CoolCropPrediction{

    getAllCrop(callback){
        CropList.findAll({ order: [
                ['name', 'ASC'],
            ]}).then(users => {
            callback(users);
        });
    }

    getAllMarket(callback){
        MarketList.findAll({ order: [
                ['name', 'ASC'],
            ]}).then(users=>{
            callback(users);
        });
    }
    getAllMarketByLocation(input,callback){
        let query="select *,(6371 * ACOS(SIN(RADIANS("+input.lat+")) * SIN(RADIANS(`lat`)) + COS(RADIANS("+input.lat+")) * COS(RADIANS(`lat`)) * COS(RADIANS(`lon`) - RADIANS("+input.long+")))) AS `distance` from market_list having distance <=7000  ORDER BY `distance` ASC";
        sequelize.query(query).then(all_rows=>{
            callback({"market":all_rows[0]});
        });
    }

    predictionPrice(input,callback){

        let query='SELECT * FROM `predict_price` AS `predict_price` INNER JOIN `date_list` AS `date_list` ON `predict_price`.`date_ID` = `date_list`.`id` AND `predict_price`.`market_ID`='+input.market_id+' AND `predict_price`.`crop_ID`='+input.crop_id+' AND `date_list`.`date` > DATE_SUB(now(), INTERVAL 10 DAY) order by `predict_price`.`id` desc limit 5';

        if(input.startDate!="null"){

        }

        sequelize.query(query).then(rows=>{
           console.log(input);

            let query1='SELECT date,ROUND(AVG(price),0) AS `price` FROM `raw_price` AS `raw_price` INNER JOIN `date_list` AS `date_list` ON `raw_price`.`date_ID` = `date_list`.`id` AND `raw_price`.`market_ID`='+input.market_id+' AND `raw_price`.`crop_ID`='+input.crop_id+' AND `date_list`.`date`> DATE_SUB(now(), INTERVAL 5 MONTH) AND `date_list`.`date` < now() group by month(date) ';

            if(typeof input.startDate!="undefined" && typeof input.endDate!="undefined" && input.startDate!="" && input.startDate!=null && input.endDate!="" && input.startDate!=null){

                query1='SELECT date,ROUND(AVG(price),0) AS `price` FROM `raw_price` AS `raw_price` INNER JOIN `date_list` AS `date_list` ON `raw_price`.`date_ID` = `date_list`.`id` AND `raw_price`.`market_ID`='+input.market_id+' AND `raw_price`.`crop_ID`='+input.crop_id+' AND `date_list`.`date`>"'+input.startDate+'" AND `date_list`.`date` < "'+input.endDate+'" group by month(date)';

                  // if less than month
                  var a = moment(input.startDate);
                  var b = moment(input.endDate);
                  console.log(" DATE DIFF (*_*) ",b.diff(a, 'days'));
                  if(b.diff(a, 'days')<31){
                      query1='SELECT date,price AS `price` FROM `raw_price` AS `raw_price` INNER JOIN `date_list` AS `date_list` ON `raw_price`.`date_ID` = `date_list`.`id` AND `raw_price`.`market_ID`='+input.market_id+' AND `raw_price`.`crop_ID`='+input.crop_id+' AND `date_list`.`date`>"'+input.startDate+'" AND `date_list`.`date` < "'+input.endDate+'"';
                  }

            }


            sequelize.query(query1).then(all_rows=>{

                callback({"predict_chart":rows[0],"predict_graph":all_rows[0]});
            });
        });

    }

}
module.exports=CoolCropPrediction;