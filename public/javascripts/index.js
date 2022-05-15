let name = null;
let roomNo = null;
let socket=io();
const service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
const api= 'AIzaSyAG7w627q-djB4gTTahssufwNOImRqdYKM';


/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */

function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';
    // document.getElementById('chat_interface').style.display = 'none';

    //@todo here is where you should initialise the socket operations as described in teh lectures (room joining, chat message receipt etc.)
    socket.on('joined', function (room, userId){

        if (userId === name){
            //it enters the chat
            hideLoginInterface(room, userId);
        } else {
            //notifies that someone has joined the room
            writeOnHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });
    //called when a message is received
    socket.on('chat', function (room, userId, chatText){
        let people = userId
        if(userId == name) people = 'Me ';
        writeOnHistory('<b>' + people + ':</b> ' + chatText);
    });

    socket.on('knowledge graph', function(name, id, description, url){
        showgraph(name,id,description,url).then(r=>{})
    });


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
}




function showgraph(name, Id, description, url){
    let pos = document.getElementById('showgraph');
    let graph = document.createElement('div');
    graph.className = 'showgraph';
    graph.innerHTML = '<h2>' + name + '</h2>' +
        '<h3>' + Id + '</h3>' +
        '<div>' + description + '</div><div><a href='+ url + '>the link</a></div>';
    pos.appendChild(graph);
    pos.style.display = 'block';
}
/** method to search knowledge graph */
function widgetInit(){
    let type= document.getElementById("myType").value;
    if(type){
        let config = {
            'limit': 10,
            'languages': ['en'],
            'types': [type],
            'maxDescChars': 100,
            'selectHandler': selectItem,
        }

        KGSearchWidget(api, document.getElementById("myInput"), config);
        document.getElementById('typeSet').innerHTML= 'of type: '+type;
        document.getElementById('widget').style.display='block';
        document.getElementById('typeForm').style.display= 'none';
    }else {
        alert('Set the type please');
        document.getElementById('widget').style.display='none';
        document.getElementById('show_graph').style.display='none';
        document.getElementById('typeSet').innerHTML= '';
        document.getElementById('typeForm').style.display= 'block';
    }


}

function selectItem(event) {
    let row = event.row;

    document.getElementById('resultId').innerText= 'id: '+row.id;
    document.getElementById('resultName').innerText= row.name;
    document.getElementById('resultDescription').innerText= row.rc;
    document.getElementById("resultUrl").href= row.qc;
    document.getElementById('show_graph').style.display= 'block';
    document.getElementById('roomNo').value=roomNo;
    showgraph(row.name, row.id, row.rc, row.qc);
    socket.emit('knowledge graph', roomNo, row.name, row.id, row.rc, row.qc);
}



function generateRoom() {
    roomNo = Math.round(Math.random() * 10000);
    document.getElementById('roomNo').value = 'R' + roomNo;
}


function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    socket.emit('chat', roomNo, name, chatText);

    // @todo send the chat message
}

function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    let imageUrl= document.getElementById('image_url').innerHTML;
    if (!name) name = 'Unknown-' + Math.random();
    //@todo join the room
    socket.emit('create or join',roomNo,name);
    initCanvas(socket, imageUrl);
    hideLoginInterface(roomNo, name);
    loadHistory()
}
function loadHistory(){
    RoomGet(name,roomNo,"t").then(x=>{
        x.forEach(xx=>{
            writeOnHistory(xx.text,true);
        })
    })
}

function writeOnHistory(text,dont_store) {
    if(!dont_store)RoomStore(name,roomNo,"t",{text:text});

    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    // scroll to the last element

    document.getElementById('chat_input').value = '';
}
//back to the page
function back()
{
    window.location.href="/"
}



function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}







