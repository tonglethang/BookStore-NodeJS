function plus(pos){
    var count = document.getElementsByClassName('qty');
    var tmp= 0;
    var max = document.getElementsByClassName("max_quan");
    for(var i = 0; i < count.length; i++){
        if(i == pos){
            tmp = parseInt(count[i].value) + 1;
            count[i].value = tmp;
            if(parseInt(count[i].value) > parseInt(max[i].value)){
                count[i].value = max[i].value;
            }
        }
    }
}
function minus(pos){
    var count = document.getElementsByClassName("qty");
    for(var i = 0; i < count.length; i++){
        if(i == pos){
            tmp = parseInt(count[i].value) - 1;
            count[i].value = tmp;
            if(count[i].value < 1 ){
                count[i].value = 1
            }
        }
    }
}
function Redirect() {
    var a = document.getElementsByClassName("qty");
    var tmp = "";
    for(var i=0; i<a.length; i++){
        tmp += a[i].value;
    }
    window.location="/cart/update?quantity=" + tmp;
}
