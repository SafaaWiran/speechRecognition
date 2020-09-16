let speek=document.querySelector('#speek');
let hintB=document.querySelector('#hint');
let submitB=document.querySelector('#submit');
let score=document.querySelector('#score');
let field=document.querySelector('#field');
let output= document.querySelector('#output');
let action = document.querySelector('#action');
let recognition ;
let n=0,m=0;o=0 ;

//Disabling speeks
speek.disabled=true ;
hintB.disabled=true ;
submitB.disabled=true ;


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
    

//Show pilote speech
function showpilote(){
    let pilote=document.getElementById("pilote");
    pilote.classList.remove("hide"); 
}

//Speech recognition start
function runSpeechRecognition() {
    m=1;

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
    return (n*100/expect.length) ;
}

//cette fonction va être appelée en cliquant sur le bouton check et va appeler la fct "check" si un speech est detécté 
function submit(){
    let t ;
    if(m===1) recognition.stop();
    
    action.innerHTML = "<small>stopped listening</small>";
    
    field.classList.add("hide");
    
    if(window.final_transcript){
        score.classList.remove("hide");
        let s=check(window.final_transcript,atc.textContent.replaceAll(',','').replaceAll('.',''));
        if(s<50){
            score.innerHTML=s+"% Correct, r&eacutep&eacutetez";   
            score.classList.add("alert-danger");
            return 0 ;
        }
        else {
            score.classList.add("alert-success");
            score.innerHTML=s+"% Correct, continuez"; 
        }
    }
    
    synthesis(pilote2.textContent); 
    t=pilote1.classList.toggle("hide");  
    if(t){
        
        t=pilote2.classList.toggle("hide");
        if(t) pilote2.classList.toggle("hide");
    }

    t=atc.classList.toggle("hide");  
    if(t){
        t=atc2.classList.toggle("hide");
        if(t) atc2.classList.toggle("hide");
    }     
  
}      


function hint(){

    if(output.innerHTML===atc.textContent ){
        output.innerHTML=atc2.textContent ;
    }
    else {
        output.innerHTML=atc.textContent ;
    }
    submitB.disabled=false ;
}


            
            
                


            
            
         

            

		