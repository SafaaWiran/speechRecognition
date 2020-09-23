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
let recognition ;
let c1,c2,c3;
let pilote=[], atc=[], field=[];
field[0]=document.querySelector('#field');
pilote[0]=document.querySelector('#pilote1');
atc[0]=document.querySelector('#atc');  
let n=0,m=0;o=0;sT=0;t=1;

//Disabling speeks
speek.disabled=true ;
hintB.disabled=true ;
submitB.disabled=true ;

function write(random) {
    c1=false;c2=false;c3=false ;
    pilote[0].classList.add("hide");
    atc[0].classList.add("hide");
    score.classList.add("hide");
    field[0].classList.remove("hide");

    field[0].innerHTML=random[2][0];
    field[1]=random[2][1];
    pilote[0].innerHTML= random[0][0];
    atc[0].innerHTML = random[1][0];
    pilote[1]=random[0][1] ;
    atc[1]=random[1][1] ;
    pilote[2]=random[0][2];

    synthesis(pilote[0].textContent);

    //Boutons Speek et Hint activé
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
    recognition.lang = 'fr-FR';
    recognition.maxAlternatives = 1;
    
    // start recognition

    action.innerHTML = "<small>listening, please speak...</small>";
    recognition.start();
    window.final_transcript = '';
    
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
    for(i=0;i<str.length;i++){
        if(str[i]===expect[i]) {
            n++;
        }
        else {
            p=str[i].split(""); 
            q=expect[i].split(""); 
            if(p[0]===q[0]) n+=1/2 ;
        }
    }
    return ((n*100/expect.length).toFixed(2)) ;
}

//cette fonction va être appelée en cliquant sur le bouton check et va appeler la fct "check" si un speech est detécté 
function submit(){
    let s;
    scoreTotal.classList.remove("hide");
    
    if(m===1) recognition.stop();
    action.innerHTML = "<small>stopped listening</small>";
    
    field[0].classList.add("hide");
    
    if(window.final_transcript){
        score.classList.remove("hide");
        s=check(window.final_transcript,atc[0].textContent);
        sT+=parseFloat(s) ;
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
    
    if(!atc[0].classList.toggle("hide")){
        pilote[0].classList.remove("hide");
        atc[0].classList.remove("hide");
        synthesis(pilote[1]);
        if(!atc[1]) {
            clickedCase().style="background-color: #152323; color: #d9dfdf";
            submitB.disabled=true ;
            speek.disabled=true ;
            hintB.disabled=true ;
            caseMove(clickedCase());
        }
    } else {
        clickedCase().style="background-color: #152323; color: #d9dfdf";
        pilote[0].innerHTML=pilote[1] ;
        atc[0].innerHTML=atc[1] ;
        synthesis(pilote[2]);
        submitB.disabled=true ;
        speek.disabled=true ;
        hintB.disabled=true ;
        caseMove(clickedCase());
    }

    if(!pilote[0].innerHTML){
        pilote[0].classList.add("hide");
    } else pilote[0].innerHTML="<b>Pilote : </b>"+pilote[0].innerHTML ;
    atc[0].innerHTML="<b>ATC : </b>"+atc[0].innerHTML ;
}      

function hint(){
    clickedCase().style="background-color: #7a8f8f;";
    if(output.innerHTML===atc[0].textContent && atc[1]!="") output.innerHTML=atc[1] ;
    else output.innerHTML=atc[0].textContent ;
    submitB.disabled=false ;
}

function caseMove(caseX){
    caseX.addEventListener('dblclick', function() {getRandom(myJson, caseX); caseX.style="background-color: white" ;});
}


            
            
                


            
            
         

            

		