let pilote=document.querySelector('#pilote');
//let atc=document.querySelector("#atc");
let title=document.querySelector('#title');
let atc=document.querySelector('#atc');

jsonReader();                
                        


function jsonReader() {
    let requestURL = 'https://safaawiran.github.io/speechRecognition/myJson.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let myJson = request.response;
        pilote.innerHTML = myJson["pilote"];
        title.innerHTML = myJson["titre"].toUpperCase();
        atc.innerHTML=myJson["atc"];
    }

    
}

