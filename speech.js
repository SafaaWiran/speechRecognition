
            /* JS comes here */
            function syntesis(){
                let utterance = new SpeechSynthesisUtterance("Aiac contrôle, Royal Air Maroc 209 libérons attitude 2500 pieds");
                speechSynthesis.speak(utterance);
            }

		    function runSpeechRecognition() {
		        // get output div reference
                var output= document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("action");
                // new speech recognition object
                var button=document.getElementById("button");

                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList ;
                var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent ;
                
                window.expectation="Royal Air Maroc 209 académie contrôle autoriser atterrissage piste 04 vent 50 degrés 10 noeuds";

                //var script=document.createElement("script");
                //script.src="test21.js" ;
                //document.head.appendChild(script);

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
                
                
                

                recognition.onresult = function(event) {  
                    //let interim_transcript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                      if (event.results[i].isFinal) {
                        window.final_transcript += event.results[i][0].transcript;
                      }// else {
                        //interim_transcript += event.results[i][0].transcript;
                      //}
                    }
                    output.innerHTML = "<b>Text:</b> "+window.final_transcript ; 
                    output.classList.remove("hide");
                }
                
                
            
              
                 // start recognition
                 if(button.innerHTML=="Lancer"){
                    action.innerHTML = "<small>listening, please speak...</small>";
                    button.innerHTML="Arr&ecircter" ;
                    recognition.start();
                    window.final_transcript = '';
                    //alert(text);
                 }
                 else {
                    action.innerHTML = "<small>stopped listening</small>";
                     recognition.stop();
                     button.innerHTML="Lancer" ;
                     
                     
                 }
                 
            }

            
            function check(str,expect){
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
                        p=str[i].split("");
                        q=expect[i].split("");
                        if(p[0]===q[0])n++ ;
                    }
                }
                return (n+" corrects") ;
            }

            function submit(){
                let answer=document.getElementById("answer");
                if(!window.final_transcript) {
                    alert('say something');}
                else {
                    alert(check(window.final_transcript,window.expectation));
                    answer.innerHTML="<b>Expectation :</b> "+window.expectation ;
                    answer.classList.remove("hide");}
            }

            function readJson(){
                let pilote=document.querySelector("#pilote");
                let atc=document.querySelector("#atc");

                var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

                var request = new XMLHttpRequest();
                request.open('GET', requestURL);

                request.responseType = 'json';
                request.send();

                request.onload = function() {
                let myJson = request.response;
                pilote.innerHTML=myJson["pilote"];
                }


            }
            
         

            

		