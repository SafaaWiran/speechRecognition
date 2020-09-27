onmessage = function(e){
    var now = new Date().getTime();
    var start=now+120000 ;

    var distance=start-now ;
    var min = Math.floor((distance / (1000 * 60 )));
    var sec = Math.floor((distance % (1000 * 60)) / 1000);
    postMessage(min+":"+sec); 
}