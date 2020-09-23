//Extraire les variables de ma page simulation.html
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
    let atc=[], pilot=[], instructions=[] ;
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
    pilot[0]=json[a][b][c][d]["pilote"][0];
    pilot[1]=json[a][b][c][d]["pilote"][1];
    pilot[2]=json[a][b][c][d]["pilote"][2];
    atc[0]=json[a][b][c][d]["atc"][0];
    atc[1]=json[a][b][c][d]["atc"][1];
    instructions[0]=json[a][b][c][d]["instructions"][0];
    instructions[1]=json[a][b][c][d]["instructions"][1];
    return [pilot,atc,instructions] ;
}

jsonReader(); 




    




