


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function removeChild(e) {
    while ( e.firstChild ) {
      e.removeChild( e.firstChild );
    }
  }
  
setInterval(function() {
    var baseDate       = new Date(),
        seconds        = baseDate.getSeconds(),
        secondsElement = checkUpdate("3316"),
        secondsElement = checkUpdate("3352");

}, 1000);

function escapeHTML(text) {
    return text 
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
}

function checkUpdate(course){
    var par = document.getElementById(course+"Message");
    var oldLength = par.childElementCount;

    //console.log(oldLength);

    
    const url = 'https://lab3-austinbaggio.c9users.io/api/message'; // Get 10 random users

    window.fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            var temp = 0;
            for(var i = 0; i<data.length;i++){
                if (data[i].courseID == course){
                    temp = data[i].timeStamp
                    
                    //console.log(data[i].timeStamp);
                }
            }
            
             
           
            
            if(oldLength == 0){
                getMessages(course);
            }
            else if(par.lastChild.firstChild.innerHTML != ("TimeStamp: "+temp))
            {
                getMessages(course)
            
            //console.log("DATA TEMP: "+ temp)//+data[temp].timeStamp)
            //console.log("ELEMENT LC: " + par.lastChild.firstChild.innerHTML)
            }
      })
}
function getMessages(course){
    
    function createNode(element) {
        return document.createElement(element); // Create the type of element you pass in the parameters
    }

    function append(parent, el) {
        return parent.appendChild(el); // Append the second parameter(element) to the first one
    }
    
    
    const ol = document.getElementById(course+"Message");
    
    const url = 'https://lab3-austinbaggio.c9users.io/api/message'; // Get 10 random users
   
    
    removeChild(ol);

    window.fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let fullMessage = data;
            return fullMessage.map(function(fullMess){
                if (fullMess.courseID == course){
                    
                        let li = createNode('li'),
                        cID = createNode("cID"),
                        tStmp = createNode('tStmp'),
                        mess = createNode('mess');
                       
                    tStmp.innerHTML = "TimeStamp: " + fullMess.timeStamp;
                    mess.innerHTML = " | Message: " + fullMess.messageBody;
                        
                    append(li, tStmp);
                    append(li, cID);
                    append(li, mess);
                    append(ol,li);
                    
                    while(ol.childElementCount>20){
                        ol.removeChild(ol.firstChild);
                     }
                }
            });
        })
        
        .catch(function(error) {
            console.log(error);
        });
}

function saveToDB(course){
    
    if (document.getElementById(course+"In").value.length >200)
        {
            alert("Message must be less than 200 characters");
        }
    
    else{
        
    
    window.fetch('/api/message', {
      	method: 'post',
      	headers: {'Content-Type': 'application/json'},
      	body: JSON.stringify({messageBody: escapeHTML(document.getElementById(course+'In').value), courseID: course})
      })
      .then(); // load the new list
    getMessages(course);
    }
    
}