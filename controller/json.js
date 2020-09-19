//Extraire les variables de ma page simulation.html
let pilote1=document.querySelector('#pilote1');
let pilote2;
let pilote3;
var case1=document.querySelector('#case1');
var case2=document.querySelector('#case2');
var case3=document.querySelector('#case3');
let c1,c2,c3;
var atc=document.querySelector('#atc');  
var atc2;
var field2;
let myJson ;

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

function getRandom(json,caseX){
    let a,b,c,d ;
    //Génération de paramétres aléatoires
    a=0;
    b=json[a]["n"]; //b = (nbr cas)+1
    b=Math.floor(Math.random()*b); //b appartient à [0;(nbr cas)]
    c=json[a][b]["n"]; //de mm
    c=Math.floor(Math.random()*c);
    d=json[a][b][c]["n"];
    d=Math.floor(Math.random()*d);
    //Affichage de la position du cas généré dans le haut de la page
    caseX.innerHTML=a+"."+b+"."+c+"."+d ;
    //Extraires les cas aléatoires de json file
    let e=json[a][b][c][d]["pilote"][0];
    let f=json[a][b][c][d]["pilote"][1];
    let g=json[a][b][c][d]["pilote"][2];
    let h=json[a][b][c][d]["atc"][0];
    let i=json[a][b][c][d]["atc"][1];
    let j=json[a][b][c][d]["instructions"][0];
    let k=json[a][b][c][d]["instructions"][1];
    return [e,f,g,h,i,j,k] ;
}

function write(random, c) {
    c1=false;c2=false;c3=false ;
    pilote1.classList.add("hide");
    atc.classList.add("hide");
    score.classList.add("hide");
    field.classList.remove("hide");

    field.innerHTML=random[5];
    field2=random[6];
    pilote1.innerHTML= random[0];
    atc.innerHTML = random[3];
    pilote2=random[1] ;
    atc2=random[3] ;
    pilote3=random[2];

    synthesis(pilote1.textContent);

    //Boutons Speek et Hint activé
    speek.disabled=false ;
    hintB.disabled=false ;
}

function clickedCase(){
    if(c1) return case1 ;
    if(c2) return case2 ;
    if(c3) return case3 ;
}

jsonReader(); 




    




