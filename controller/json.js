

//Extraire les variables de ma page speech.html
let pilote1=document.querySelector('#pilote1');
let pilote2=document.querySelector('#pilote2');
let piloteClass=document.querySelector('#piloteClass');
let case1=document.querySelector('#case1');
let case2=document.querySelector('#case2');
let case3=document.querySelector('#case3');
let atc=document.querySelector('#atc');  
let atc2=document.querySelector('#atc2');

//Declaration
let random1, random2, random3 ;

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
        random1=getRandom(myJson,case1) ;
        random2=getRandom(myJson,case2) ;
        random3=getRandom(myJson,case3) ;        
    } 
}


function getRandom(myJson,caseX){
    let a,b,c,d ;
    //Génération de paramétres aléatoires
    a=0;
    b=myJson[a]["n"]; //b = (nbr cas)+1
    b=Math.floor(Math.random()*b); //b appartient à [0;(nbr cas)]
    c=myJson[a][b]["n"]; //de mm
    c=Math.floor(Math.random()*c);
    d=myJson[a][b][c]["n"];
    d=Math.floor(Math.random()*d);
    //Affichage de la position du cas généré dans le haut de la page
    caseX.innerHTML=a+"."+b+"."+c+"."+d ;
    //Extraires les cas aléatoires de myJson
    let e=myJson[a][b][c][d]["pilote"][0];
    if(e==="")e="speak";
    let f=myJson[a][b][c][d]["pilote"][1];
    if(f==="")f="clear";
    let g=myJson[a][b][c][d]["atc"][0];
    let h=myJson[a][b][c][d]["atc"][1];

    return [e,f,g,h] ;
}

function write(random) {
    pilote1.innerHTML = random[0];
    atc.innerHTML = "La Bonne Réponse : "+random[2];
    if(!random[1]) pilote2.innerHTML="clear";
    else pilote2.innerHTML = "Reply : "+random[1];
    if(!random[3]) atc2.innerHTML ="Très bien";
    else atc2.innerHTML = "La Bonne Réponse 2: "+random[3];
    piloteClass.classList.remove("hide");
}

jsonReader(); 

try {
    case1.addEventListener('click',write(random1));
    case2.addEventListener('click',write(random2));
    case3.addEventListener('click',write(random3));
} catch(error){
    case1.addEventListener('click',write(random1));
    case2.addEventListener('click',write(random2));
    case3.addEventListener('click',write(random3));
}
    




