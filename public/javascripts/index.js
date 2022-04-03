let name = null;
let roomNo = null;
let socket=io();



/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
let base64Info = ""
function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    //@todo here is where you should initialise the socket operations as described in teh lectures (room joining, chat message receipt etc.)
     initSocket();
}

/** acp21zo */
function initSocket(){
    // called when someone joins the room. If it is someone else it notifies the joining of the room
    socket.on('joined', function (room, userId){

        if (userId == name){
            //it enters the chat
            hideLoginInterface(room, userId);
        } else {
            //notifies that someone has joined the room
            writeOnHistory('<b>' + userId + '</b>' + 'joined room ' + room);
        }
    });
    //called when a message is received
    socket.on('chat', function (room, userId, chatText){
        let who = userId
        if(userId == name) who = 'Me ';
        writeOnHistory('<b>' + who + ':</b> ' + chatText);
    });

    socket.on('knowledgegraph', function(name, id, desc, url){
        resultPanel(name,id,desc,url).then(r=>{})
    });
}

function resultPanel(resultname, resultId, desc, url){
    let panel = document.getElementById('resultPanel');
    let results = document.createElement('div');
    results.className = 'resultPanel';
    results.innerHTML = '<h2>' + resultname + '</h2>' +
        '<h4>' + resultId + '</h4>' +
        '<div>' + desc + '</div><div><a href='+ url + '>Link to Webpage</a></div>';
    panel.appendChild(results);
    panel.style.display = 'block';
}
/** acp21zo */

/**
 * called to generate a random room number
 * This is a simplification. A real world implementation would ask the server to generate a unique room number
 * so to make sure that the room number is not accidentally repeated across uses
 */
function generateRoom() {
    roomNo = Math.round(Math.random() * 10000);
    document.getElementById('roomNo').value = 'R' + roomNo;
}

/** acp21zo
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    // @todo send the chat message
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    let imageUrl= document.getElementById('image_url').value;
    if (!name) name = 'Unknown-' + Math.random();
    //@todo join the room
    initCanvas(socket, imageUrl);
    hideLoginInterface(roomNo, name);
}

/**
 * it appends the given html text to the history div
 * this is to be called when the socket receives the chat message (socket.on ('message'...)
 * @param text: the text to append
 */
function writeOnHistory(text) {
    if (text==='') return;
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    // scroll to the last element
    history.scrollTop = history.scrollHeight;
    document.getElementById('chat_input').value = '';
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}

/** some functions are used-acp21zo*/

/** send ajax query using Jquery
 * @param url send url
 * @param data send data
 */

function sendAjaxQuery(url,data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var re = dataR;
        },
        error: function (error) {
            alert('Error' + error.message);
        }

    });
}
/** acp21zo
 * called when user press the submit button
 * @param submission event
 */

function  onSubmit(url){
    let formArray= $("#upForm").serializeArray();
    formArray.push({"name": "BaseCode", "value":base64Info});
    console.log(formArray);

    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }

    console.log(data);
    sendAjaxQuery(url,data);
    event.preventDefault();
}


function gohome()
{
    window.location.href=".."
}
/** acp21zo */
