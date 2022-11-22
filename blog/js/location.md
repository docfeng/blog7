#search



#hash

hash=function(){
    var re={};
    var hash=location.hash.replace("#","").split(";");
    for(var i=0;i<hash.length;i++){
        var h=hash[i].split("="); 
        re[h[0]]=h[1];
    }
    return re;
}

var re=[]
for(var i in location){
    re.push([i,location[i]])
}
alert(JSON.stringify(re,null,4))