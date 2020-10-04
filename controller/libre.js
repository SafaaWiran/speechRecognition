let random1, random2, random3 ;

function jsonReader() {
    let requestURL = 'https://safaawiran.github.io/speechRecognition/model/myJson.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();
    request.onload = function () {
        myJson = request.response;
        
        //ajouter du contenu à la page HTML à partir de json
        random1=getRandom(myJson,case1) ;
        random2=getRandom(myJson,case2) ;
        random3=getRandom(myJson,case3) ;    

        case1.addEventListener('click',function(){write(random1);c1=true;});
        case2.addEventListener('click',function(){write(random2);c2=true;});
        case3.addEventListener('click',function(){write(random3);c3=true;});
    }
        
} 

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

function getRandom(file, caseX){
    
}