
global.baseDir=function(){
   let dir=__dirname;
   return dir.substr(0,dir.length-3);
}

global.baseFile=function(filename){
   return baseDir()+filename;
}