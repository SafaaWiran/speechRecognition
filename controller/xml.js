let xmlDoc ;
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
    let a=Math.floor(Math.random()*70);
    let pilot=[], atc=[], instructions=["",""];
    //random=spawnTask aléatoire
    let random=xmlDoc.getElementsByTagName("spawnTask")[a];
    caseX.innerHTML=random.getAttribute("name");
    for(let i=0;i<random.childNodes.length;i++) {
        if (random.getElementsByClassName("ATC")[i] && random.getElementsByClassName("ATC")[i].getAttribute("lang")==="fr") atc[i]=random.getElementsByClassName("ATC")[i].childNodes[0].nodeValue ;
        if (random.getElementsByClassName("Pilot")[i] && random.getElementsByClassName("Pilot")[i].getAttribute("lang")==="fr") pilot[i]=random.getElementsByClassName("Pilot")[i].childNodes[0].nodeValue ; 
        if(pilot[i]==="undefined")pilote[i]="";
        if (random.getElementsByClassName("instructions")[i]) instructions[i]=random.getElementsByClassName("instructions")[i].childNodes[0].nodeValue ; 
        if (instructions[i]==="undefined")instructions[i]="";
    } 
    return [pilot,atc,instructions] ;
}

function caseMove(caseX){
    next=setTimeout(function(){ let random ;
        random=getRandom(xmlDoc, caseX);
        caseX.style="background-color: white" ;
        if(caseX===case1) random1=random ;
        if(caseX===case2) random2=random ;
        if(caseX===case3) random3=random ; },8000);
}







