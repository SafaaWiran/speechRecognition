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
field=document.querySelector('#field');
pilote=document.querySelector('#pilote1');
atc=document.querySelector('#atc');  
let n=0,m=0;o=0;sT=0;t=1;
let next;

//Disabling buttons
speek.disabled=true ;
hintB.disabled=true ;
submitB.disabled=true ;

function write(random) {                                            
    c1=false;c2=false;c3=false ;
    clearTimeout(next);
    clickedCase.style="background-color:white";
    if(pilote[0]) pilote.classList.add("hide");
    if(atc[0]) atc.classList.add("hide");
    score.classList.add("hide");
    field.classList.remove("hide");
    for(let i=0;i<random.length;i++){
        for(let j=0;j<random[i].length;j++){
            if(!random[i][j])random[i][j]==="";
        }
    }
    field[0]=random[2][0];
    field.innerHTML=field[0];
    pilote[0] = random[0][0];
    pilote.innerHTML= pilote[0];
    atc[0] = random[1][0];
    atc.innerHTML = atc[0];
    pilote[1]=random[0][1] ;
    atc[1]=random[1][1];
    field[1]=random[2][1];
    field[2]=random[2][2];
    pilote[2]=random[0][2];
    atc[2]=random[1][2];
    
    if(pilote[0]) synthesis(pilote.textContent);

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
    
    //field[0].classList.add("hide");
    
    if(window.final_transcript){
        score.classList.remove("hide");
        s=check(window.final_transcript,atc.textContent);
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
    
    if(!atc.classList.toggle("hide")){
        if(pilote[0])pilote.classList.remove("hide");
        if(atc[0]) atc.classList.remove("hide");
        field.innerHTML=field[1];
        synthesis(pilote[1]);
        if(!atc[1]) {
            clickedCase().style="background-color: #152323; color: #d9dfdf";
            submitB.disabled=true ;
            speek.disabled=true ;
            hintB.disabled=true ;
            caseMove(clickedCase());
        }
        //field.classList.remove("hide");    
    }
    else if(atc.innerHTML===atc[1]) {
        clickedCase().style="background-color: #152323; color: #d9dfdf";
        pilote.innerHTML=pilote[2] ;
        atc.innerHTML=atc[2] ;
        submitB.disabled=true ;
        speek.disabled=true ;
        hintB.disabled=true ;
        if(pilote[3]) synthesis(pilote[3]);
        caseMove(clickedCase());
    } else {
        clickedCase().style="background-color: #2f4f4f; color: #d9dfdf";
        pilote.innerHTML=pilote[1] ;
        atc.innerHTML=atc[1] ;
        field.innerHTML=field[2];
        synthesis(pilote[2]);
        if(!atc[2]) {
            field.classList.add("hide");
            clickedCase().style="background-color: #152323; color: #d9dfdf";
            submitB.disabled=true ;
            speek.disabled=true ;
            hintB.disabled=true ;
            caseMove(clickedCase());
        }
    }
    if(!pilote[0]){
        pilote.classList.add("hide");
    } else pilote.innerHTML="<b>Pilote : </b>"+pilote.innerHTML ;
    atc.innerHTML="<b>ATC : </b>"+atc.innerHTML ;
}      

function hint(){
    clickedCase().style="background-color: #7a8f8f;";
    if(output.innerHTML===atc.textContent && atc[1]) output.innerHTML=atc[1] ;
    else output.innerHTML=atc.textContent ;
    submitB.disabled=false ;
}








            
            
                


            
            
         

            

		