function log(a,b){postMessage({call:"chat:log",data:[a,b]})}function respondToUserQuestion(a){postMessage({call:"chat:message",data:a})}function init(){if($(".jumbotron").hide(),$(".marketing").show(),window.Worker){var a=new Worker("scripts/robot.js");console.info("Robot worker initialized ..."),a.postMessage({call:"chat:start",args:{name:"Peter"}}),a.onmessage=function(a){return"chat:log"==a.data.call?void console.log(a.data.data[0],a.data.data[1]):("chat:message"==a.data.call&&($('[name="command"]').before("<div> > "+a.data.data+" </div>"),$("#response-area").scrollTop($("#response-area")[0].scrollHeight)),void console.info("UI Thread called by worker with the following data ",a.data))},$('[name="command"]').keyup(function(b){13==b.keyCode&&("goodbye"==$(this).val().toLowerCase()&&($(this).before("<div> > Good bye, going to sleep now ZZZZZzzzzz...</div>"),a.postMessage({call:"chat:close"}),$(this).remove()),$(this).before("<div> > looking for: "+$(this).val()+" wait while i am processing your request ...</div>"),$("#response-area").scrollTop($("#response-area")[0].scrollHeight),a.postMessage({call:"chat:message",args:{query:$(this).val()}}),$(this).val(""))})}}self.onmessage=function(a){return"chat:start"==a.data.call?(log("Chat have been started by UI ",a.data),void respondToUserQuestion("Hey! this is "+a.data.args.name+", give me a topic and I'll send you a google link for that very quickly!")):"chat:message"==a.data.call?(log("Worker have recieved a new message ...",a.data),respondToUserQuestion(' Click <a target="_blank" href="https://www.google.ps/?q='+encodeURIComponent(a.data.args.query)+'"> here for results page about "'+a.data.args.query+'" </a>'),void respondToUserQuestion(" What else you wanna know?")):("chat:close"==a.data.called&&self.close(),void log("Unsupported operation have been called ",a.data))};