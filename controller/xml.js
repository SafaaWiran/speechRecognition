let xmlDoc ;
let lang ;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        xmlReader(this);
    }
};

xhttp.open("GET", "https://safaawiran.github.io/speechRecognition/model/IFR.xml", true);
xhttp.send();

function xmlReader(xml) {
    xmlDoc = xml.responseXML;

    random1=getRandom(xmlDoc,case1);
    random2=getRandom(xmlDoc,case2);
    random3=getRandom(xmlDoc,case3);

    case1.addEventListener('click', function(){write(random1); c1=true ;});
    case2.addEventListener('click', function(){write(random2); c2=true ;});
    case3.addEventListener('click', function(){write(random3); c3=true ;}); 
}

function getRandom(xmlDoc,caseX){
    let j=0,k=0 ;
    let a=Math.floor(Math.random()*66);
    lang=Math.random()*2 ;
    if(lang<1)lang="en-US" ; 
    else lang="fr-FR" ;
    let pilot=[], atc=[], instructions=[];
    //random=spawnTask aléatoire
    let random=xmlDoc.getElementsByTagName("spawnTask")[a];
    //Affichage ds icons sur les strips
    if(random.getElementsByTagName("icon")[0].childNodes[0].nodeValue==="myPlane") caseX.innerHTML="<img src='../img/myPlane.png' width='40'></img>";
    if(random.getElementsByTagName("icon")[0].childNodes[0].nodeValue==="planeDeparture") caseX.innerHTML="<i class='fas fa-plane-departure fa-lg'></i>";
    if(random.getElementsByTagName("icon")[0].childNodes[0].nodeValue==="plane") caseX.innerHTML="<i class='fas fa-plane fa-lg'></i>";
    if(random.getElementsByTagName("icon")[0].childNodes[0].nodeValue==="planeArrival") caseX.innerHTML="<i class='fas fa-plane-arrival fa-lg'></i>";
    for(let i=0;i<random.childNodes.length;i++) {
        if (random.getElementsByClassName("ATC")[i] && random.getElementsByClassName("ATC")[i].getAttribute("lang")===lang) {atc[j]=random.getElementsByClassName("ATC")[i].childNodes[0].nodeValue ; j++;}
        if (random.getElementsByClassName("Pilot")[i] && random.getElementsByClassName("Pilot")[i].getAttribute("lang")===lang) {pilot[k]=random.getElementsByClassName("Pilot")[i].childNodes[0].nodeValue ; k++;} 
        if (random.getElementsByClassName("instructions")[i]) instructions[i]=random.getElementsByClassName("instructions")[i].childNodes[0].nodeValue ; 
    } 
    return [pilot,atc,instructions,lang] ;
}

function caseMove(caseX){
    next=setTimeout(function(){ 
        let random ;
        random=getRandom(xmlDoc, caseX);
        caseX.removeAttribute("style");
        if(caseX===case1) random1=random ;
        if(caseX===case2) random2=random ;
        if(caseX===case3) random3=random ; },10000); 
}







