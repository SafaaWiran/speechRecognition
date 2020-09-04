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
        function getRandom(speaker){
            let a,b,c,d ;
            a=0;
            //récupérer le n: nbr d'option de b
            b=myJson[a.toString()]["n"];
            //entier aléatoire entre 0 et n
            b=Math.floor(Math.random()*b);
            c=myJson[a.toString()][b.toString()]["n"];
            c=Math.floor(Math.random()*c);
            d=myJson[a.toString()][b.toString()][c.toString()]["n"];
            d=Math.floor(Math.random()*d);
            return myJson[a.toString()][b.toString()][c.toString()][d.toString()][speaker][0];
        }
        //ajouter du contenu à la page HTML à partir de json
        pilote.innerHTML = getRandom('pilote');
        atc.innerHTML = "La Bonne Réponse : "+myJson["0"]["0"]["0"]["0"]["atc"][0];
    } 
}


jsonReader(); 


