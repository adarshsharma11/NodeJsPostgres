module.exports=function(){
    return  {
        "mysql":{
            "host":env("MYSQL_HOST"),
            "username":env("MYSQL_USERNAME"),
            "password":env("MYSQL_PASSWORD")
        },
        "mongodb":{
            "host":env("MONGO_HOST"),
            "username":env("MONGO_USERNAME"),
            "password":env("MONGO_PASSWORD")
        },
        "active_db":"mysql"
    }
};