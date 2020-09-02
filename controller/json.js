//Extraire les variables de ma page speech.html
let pilote=document.querySelector('#pilote');
let title=document.querySelector('#title');
let atc=document.querySelector('#atc');                     

//Cette fonction va lire le contenu du fichier Json
function jsonReader() {
    let requestURL = 'https://safaawiran.github.io/speechRecognition/model/myJson.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let myJson = request.response;
        //ajouter du contenu à la page HTML à partir de json
        pilote.innerHTML = myJson["0"]["0"]["0"]["0"]["pilote"][0] ;
        
        title.innerHTML = myJson["safaa"] ;

        atc.innerHTML = myJson["0"]["0"]["0"]["0"]["atc"][0];
    } 
}

jsonReader(); 


