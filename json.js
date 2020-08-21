let pilote = document.querySelector["pilote"];

function jsonReader() {
    

    let requestURL = 'https://safaawiran.github.io/speechRecognition/myJson.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let myJson = request.response;
        pilote.innerHTML = "<b>Pilote : </b>" + myJson["pilote"];
    }
}
                