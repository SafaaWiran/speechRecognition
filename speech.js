            //jsonReader();
            /* JS comes here */

            //Voice synthesis set up
            function syntesis(){
                let utterance = new SpeechSynthesisUtterance(document.getElementById("pilote").textContent);
                speechSynthesis.speak(utterance);
            }

		    function runSpeechRecognition() {
		        // get output div reference
                var output= document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("action");
                // new speech recognition object
                var button=document.getElementById("button");

                //initialisation de SpeechRecognition interface
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent ;
                
                
                //window.expectation="Royal Air Maroc 209 académie contrôle autoriser atterrissage piste 04 vent 50 degrés 10 noeuds";

                var recognition = new SpeechRecognition();
                

                
                //Grammar set
                /*var grammar = '#JSGF V1.0; grammar colors; public <colors> = red | blue | yellow | white;' 
                var speechRecognitionList = new SpeechGrammarList();
                speechRecognitionList.addFromString(grammar, 1);
                recognition.grammars = speechRecognitionList;*/

                //propriété de la reconnaissance
                recognition.continuous=true ;
                recognition.interimResults=true;
                recognition.lang = 'fr-FR';
                recognition.maxAlternatives = 1;
              
                // This runs when the speech recognition service returns result
                /*recognition.onresult = function(event) {
                    window.transcript = event.results[0][0].transcript;
                    var confidence = event.results[0][0].confidence;
                    output.innerHTML = "<b>Text:</b> " + window.transcript+"<br/> <b>Confidence:</b> " + confidence*100+"%";
                    output.classList.remove("hide"); 
                };*/
                
                
                
                //Affichage du résultat
                recognition.onresult = function(event) {  
                    //let interim_transcript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                      if (event.results[i].isFinal) {
                        window.final_transcript += event.results[i][0].transcript;
                      }// else {
                        //interim_transcript += event.results[i][0].transcript;
                      //}
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
                    //alert(text);
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
                //str=str.toUpperCase();
                //expect=expect.toUpperCase();
                str=str.split(" ");
                expect=expect.split(" ");
                let p,q ;
                let i;
                for(i=0;i<str.length;i++){
                    if(str[i]===expect[i]) {
                        n++;
                    }
                    else {
                        p=str[i].split(""); //p=[l,o,y,a,l]
                        q=expect[i].split(""); //q=[r,o,y,a,l]
                        if(p[0]===q[0]) n+=1/2 ;
                    }
                }
                return (n+" corrects") ;
            }

            //cette fonction va être appelée en cliquant sur le bouton check et va appeler la fct "check" si un speech est detécté 
            function submit(){
                let atc=document.getElementById("atc");
                if(!window.final_transcript) {
                    alert('say something');}
                else {
                    alert(check(window.final_transcript,answer.textContent));
                    //answer.innerHTML="<b>Expectation :</b> "+window.expectation ;
                    atc.classList.remove("hide");}
            }

            function showpilote(){
                let pilote=document.getElementById("pilote");
                pilote.classList.remove("hide");
            }



            
            
                


            
            
         

            

		