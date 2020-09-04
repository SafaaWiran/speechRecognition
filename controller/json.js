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
        function getRandom(){
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
            let e=myJson[a.toString()][b.toString()][c.toString()][d.toString()]["pilote"][0];
            let f=myJson[a.toString()][b.toString()][c.toString()][d.toString()]["pilote"][1];
            let g=myJson[a.toString()][b.toString()][c.toString()][d.toString()]["atc"][0];
            let h=myJson[a.toString()][b.toString()][c.toString()][d.toString()]["atc"][1];
            return [e,f,g,h] ;
        }
        //ajouter du contenu à la page HTML à partir de json
        pilote.innerHTML = getRandom()[0];
        atc.innerHTML = "La Bonne Réponse : "+getRandom()[2];
    } 
}


jsonReader(); 


