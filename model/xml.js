let xmlDoc ;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        xmlReader(this);
    }
};

xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://aeronautique.xyz/phraseologie/phraseologieIFR.xml", true);
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
    let a=Math.floor(Math.random()*20);
    let pilot=[], atc=[], instructions=["",""];
    //random=spawnTask aléatoire
    let random=xmlDoc.getElementsByTagName("spawnTask")[a];
    caseX.innerHTML=random.getAttribute("name");
    for(let i=0;i<random.childNodes.length;i++) {
        if (random.getElementsByClassName("ATC")[i] && random.getElementsByClassName("ATC")[i].getAttribute("lang")==="fr") atc[i]=random.getElementsByClassName("ATC")[i].childNodes[0].nodeValue ;
        if (random.getElementsByClassName("Pilot")[i] && random.getElementsByClassName("Pilot")[i].getAttribute("lang")==="fr") pilot[i]=random.getElementsByClassName("Pilot")[i].childNodes[0].nodeValue ;  
    } 
    return [pilot,atc,instructions] ;
}







