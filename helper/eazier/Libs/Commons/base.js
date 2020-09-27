global.eazier=function(){


}
// Dump value and return
global.dd=function(dump){
     console.log(dump);
     exit(1);
}

// exit
global.exit=function(code='1'){
    process.exit(code);

}

global.env=function(variable){
    const fs=require('fs');

    let rawData=fs.readFileSync(baseFile('env.json'))
    let data=JSON.parse(rawData);


    return ((typeof data[variable]!="undefined")?data[variable]:"");
}
global.config=function(variable){
    let varArray=variable.split('.');
    var config=require(baseFile('./config/'+varArray[0]))();
    return config;
}
global.controller=function(path){

    let Controller=require("../"+path);
    dd(Controller);

    let instance=new Controller();
    dd(instance);
    return instance;
}
global.middleware=function(path){
    let Middleware=require(baseFile(path))
    return Middleware;
}
global.model=function(path){
    let Model=require("../"+path)
    return Model;
}
