var case1=document.querySelector('#case1');
var case2=document.querySelector('#case2');
var case3=document.querySelector('#case3');
let speek=document.querySelector('#speek');
let hintB=document.querySelector('#hint');
let submitB=document.querySelector('#submit');
let score=document.querySelector('#score');
let output= document.querySelector('#output');
let action = document.querySelector('#action');
let scoreTotal=document.querySelector('#scoreTotal');
let count=document.querySelector("#countdown");
let recognition ;
let c1,c2,c3;
let pilote=[], atc=[], field=[];
FIELD=document.querySelector('#field');
PILOT=document.querySelector('#pilote1');
ATC=document.querySelector('#atc');  
let n=0,m=0;o=0;sT=0;t=1;
let next;
let langage ;

//Disabling buttons
speek.disabled=true ;
hintB.disabled=true ;
submitB.disabled=true ;

function write(random) {                                            
    c1=false;c2=false;c3=false ;
    PILOT.classList.add("hide");
    ATC.classList.add("hide");
    score.classList.add("hide");
    FIELD.classList.remove("hide");
 
    //Remplacer tous cas indéfini par le vide
    for(let i=0;i<random.length;i++){
        for(let j=0;j<random[i].length;j++){
            if(!random[i][j] || random[i][j]==="undefined") random[i][j]="";
        }
    }
    field[0] = random[2][0];
    FIELD.innerHTML = field[0];
    pilote[0] = random[0][0];
    PILOT.innerHTML= pilote[0];
    atc[0] = random[1][0];
    ATC.innerHTML = atc[0];
    pilote[1] = random[0][1] ;
    atc[1] = random[1][1];
    field[1] = random[2][1];
    field[2] = random[2][2];
    pilote[2] = random[0][2];
    atc[2] = random[1][2];
    langage=random[3];
    
    if(pilote[0]) synthesis(pilote[0]);

    //Boutons Speek et Hint activés
    speek.disabled=false ;
    hintB.disabled=false ;
}

function clickedCase(){
    if(c1) return case1 ;
    if(c2) return case2 ;
    if(c3) return case3 ;
}


//Voice synthesis set up
function synthesis(speech){
    let utterance = new SpeechSynthesisUtterance(speech);
    utterance.lang=langage;
    if(n===0){
        speechSynthesis.speak(utterance);  
        n=1;
    } 
    else {
        n=0;
        speechSynthesis.cancel(); 
        speechSynthesis.speak(utterance); 
    }
}

//Speech recognition start
function runSpeechRecognition() {
    m=1;
    clickedCase().style="background-color: #7a8f8f;";
    //initialisation de SpeechRecognition interface
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent ;
    //new speech recognition object
    recognition = new SpeechRecognition();

    //Defining speech recognition proparties
    recognition.continuous=true ;
    recognition.interimResults=true;
    recognition.maxAlternatives = 1;
    
    // start recognition

    action.innerHTML = "<small>listening, please speak...</small>";
    recognition.start();
    window.final_transcript ='';
    
    //Show recognition result
    recognition.onresult = function(event) {  
        //let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            window.final_transcript += event.results[i][0].transcript;
          }
        }
        output.innerHTML = "<b>Vous avez dit :</b> "+window.final_transcript ; 
        output.classList.remove("hide");
    }

    //Bouton check activé
    submitB.disabled=false ;
}

//La fonction qui fait la comparaison entre le speech obtenu et la bonne réponse
function check(str,expect){
    expect=expect.replaceAll(',','').replaceAll('.','');
    //On va incrémenter le n avec chaque bonne réponse
    let n=0;
    str=str.toUpperCase().split(" ");
    expect=expect.toUpperCase().split(" ");
    let p,q ;
    let i;
    for(i=0;i<Math.min(str.length,expect.length);i++){
        if(str[i]===expect[i]) {
            n++;
        }
        else {
            //divide every word to an array of its caracters
            p=str[i].split(""); 
            q=expect[i].split(""); 
            if(p[0]===q[0]) n+=1/2 ;
        }
    }
    return ((n*100/expect.length).toFixed(2)) ;
}

//cette fonction va être appelée en cliquant sur le bouton check et va appeler la fct "check" si un speech est détecté 
function submit(){
    let s;
    if(m===1) recognition.stop();
    action.innerHTML = "<small>stopped listening</small>";

    if(window.final_transcript){
        score.classList.remove("hide");
        s=check(window.final_transcript,ATC.textContent);
        sT+=parseFloat(s);
        scoreTotal.innerHTML=(sT/t).toFixed(2) ;
        t++;
        if(s<50){
            score.innerHTML=s+"% Correct, r&eacutep&eacutetez";  
            score.classList.remove("alert-success"); 
            score.classList.add("alert-danger");
            window.final_transcript="";
            return 0;
        }
        else {
            score.classList.remove("alert-danger");
            score.classList.add("alert-success");
            score.innerHTML=s+"% Correct"; 
        }
    }
    
    if(!ATC.classList.toggle("hide")){
        setTimeout(function(){synthesis(pilote[1]);},3000); 
        FIELD.innerHTML=field[1];
        if(!atc[1]) {
            clickedCase().style="background-color: #152323;";
            submitB.disabled=true ;
            speek.disabled=true ;
            hintB.disabled=true ;
            caseMove(clickedCase());
        } 
    }
    else if(ATC.innerHTML===atc[1]) {
        clickedCase().style="background-color: #152323;";
        PILOT.innerHTML=pilote[2] ;
        ATC.innerHTML=atc[2] ;
        submitB.disabled=true ;
        speek.disabled=true ;
        hintB.disabled=true ;
        if(pilote[3]) setTimeout(function(){synthesis(pilote[3]);},3000) ;
        caseMove(clickedCase());
    } else {
        clickedCase().style="background-color: #2f4f4f;";
        PILOT.innerHTML=pilote[1] ;
        ATC.innerHTML=atc[1] ;
        FIELD.innerHTML=field[2];
        setTimeout(function(){synthesis(pilote[2]);},3000) ;
        if(!atc[2]) {
            clickedCase().style="background-color: #152323;";
            submitB.disabled=true ;
            speek.disabled=true ;
            hintB.disabled=true ;
            caseMove(clickedCase());
        }
    }
    if(PILOT.textContent){
        PILOT.classList.remove("hide");
        PILOT.innerHTML="<b>Pilote : </b>"+PILOT.innerHTML ;
    } 
    if(ATC.textContent){
        ATC.classList.remove("hide");
        ATC.innerHTML="<b>ATC : </b>"+ATC.innerHTML ;
    }
    
}      

function hint(){
    clickedCase().style="background-color: #7a8f8f;";
    if(output.innerHTML===atc[0]) output.innerHTML=atc[1] ;
    else if(output.innerHTML===atc[1]) output.innerHTML=atc[2] ;
    else output.innerHTML=atc[0];
    submitB.disabled=false ;
}








            
            
                


            
            
         

            

		