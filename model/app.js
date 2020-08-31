


//Voice synthesis set up
function synthesis(){
    let utterance = new SpeechSynthesisUtterance(pilote.textContent);
    let start=document.querySelector("#syn");
    
    if(start.innerHTML==='<i class="fa fa-play-circle-o" aria-hidden="true"></i>'){  
        speechSynthesis.speak(utterance); 
        start.innerHTML='<i class="fa fa-stop-circle-o" aria-hidden="true"></i>'; 
    }
    else {
        speechSynthesis.cancel();
        start.innerHTML='<i class="fa fa-play-circle-o" aria-hidden="true"></i>'; 
    }
}

//Show pilote speech
function showpilote(){
    //let pilote=document.getElementById("pilote");
    pilote.classList.remove("hide"); 
}

//Speech recognition start
function runSpeechRecognition() {
    
    let output= document.querySelector('#output');
    let action = document.querySelector('#action');
    let button=document.querySelector('#button');

    //initialisation de SpeechRecognition interface
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent ;
    //new speech recognition object
    var recognition = new SpeechRecognition();

    //Defining speech recognition proparties
    recognition.continuous=true ;
    recognition.interimResults=true;
    recognition.lang = 'fr-FR';
    recognition.maxAlternatives = 1;
    
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
    

     // start recognition
    if(button.innerHTML=='<i class="fa fa-microphone" aria-hidden="true"></i>'){
        action.innerHTML = "<small>listening, please speak...</small>";
        button.innerHTML="Stop" ;
        recognition.start();
        window.final_transcript = '';
    }
     //stop recognition
    else {
        action.innerHTML = "<small>stopped listening</small>";
        recognition.stop();
        button.innerHTML='<i class="fa fa-microphone" aria-hidden="true"></i>' ; 
    }    
}

//La fonction qui fait la comparaison entre le speech obtenu et la bonne réponse
function check(str,expect){
    //On va incrémenter le n avec chaque bonne réponse
    let n=0;
    str=str.split(" ");
    expect=expect.split(" ");
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
    return (n+" corrects/"+expect.length) ;
}

//cette fonction va être appelée en cliquant sur le bouton check et va appeler la fct "check" si un speech est detécté 
function submit(){
    let atc=document.querySelector('#atc');
    if(!window.final_transcript) {
        alert('say something');}
    else {
        alert(check(window.final_transcript,atc.textContent));
        atc.classList.remove("hide");}
}
            



            
            
                


            
            
         

            

		