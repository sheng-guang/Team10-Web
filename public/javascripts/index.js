let name = null;
let roomNo = null;
let imgID=null;
let socket=io();
const apiKey= 'AIzaSyAG7w627q-djB4gTTahssufwNOImRqdYKM';


/**
 * called by <body onload>
 * it initialises the interface and the expected socket.io messages
 * plus the associated actions
 */

function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';

    //@todo here is where you should initialise the socket.io operations as described in teh lectures (room joining, chat message receipt etc.)
    socket.on('joined', function (room, userId){

        if (userId == name){
            hideLoginInterface(room, userId);
        } else {
            writeOnHistory('<b>' + userId + '</b>' + ' joined ' + room);
        }
    });

    socket.on('chat', function (room, userId, chatText){
        console.log("getChatTXT()");
        let people = userId
        if (userId == name) return;
        {
        writeOnHistory('<b>' + people + ':</b> ' + chatText);
        }
    });
    socket.on('knowledge graph', function(room,n,title, id, description, url){
        if(name==n)return;
        console.log(room,n,title,id,description[0],description[1]);
        showgraph(title,id,description[0],description[1]);
    });


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
}



/**the format to show knowledge graph */
function showgraph(title, Id, description, url,dont_store){
    if(!dont_store) {
        var to={title:title,id:Id,description:description,url:url}
        console.log(to);
        RoomStore(graphKey(),to);
    }
    let pos = document.getElementById('show_graph');
    let graph = document.createElement('div');
    graph.className = 'show_graph';
    graph.innerHTML = '<div><h2>' + title + '</h2></div>' + '<div>' + Id + '</div>' +
        '<h3>' + description + '</h3><div><a href='+ url + '>Link to Webpage</a></div>';
    pos.appendChild(graph)
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

        KGSearchWidget(apiKey, document.getElementById("myInput"), config);
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
    showgraph(row.name, row.id, row.rc, row.qc);
    console.log(row.qc);
    socket.emit('knowledge graph', roomNo,name, row.name, row.id, [row.rc, row.qc]);
}



function generateRoom() {
    roomNo = Math.round(Math.random() * 10000);
    document.getElementById('roomNo').value = 'R' + roomNo;
}


function sendChatText() {
    let chatText = document.getElementById('chat_input').value;

    writeOnHistory('<b>' + name + ':</b> ' + chatText);
    // @todo send the chat message
    console.log("sendChatText()");
    socket.emit('chat', roomNo, name, chatText);
}

function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    imgID= document.getElementById('image_url').innerHTML;
    let imageUrl=localStorage.getItem(imgID);
    document.getElementById("description").innerHTML=localStorage.getItem("description");
document.getElementById("title").innerHTML=
    localStorage.getItem("ImageTitle")+" -by- "+ localStorage.getItem("Author")+"  -on- "+
    localStorage.getItem("Date")
    if (!name) name = 'Unknown-' + Math.random();
    //@todo join the room
    socket.emit('create or join',roomNo,name);
    initCanvas(socket, imageUrl);
    hideLoginInterface(roomNo, name);
    loadHistory()
    loadGraph()
}
function graphKey(){
    return name+"|"+roomNo+"|"+imgID+"|"+"graph";
}
function  loadGraph(){
    RoomGet(graphKey()).then(x=>{
        x.forEach(xx=>{
            console.log(xx);
            showgraph(xx.title,xx.id,xx.description,xx.url,true);
        })
    })
}
function loadHistory(){
    RoomGet(Tkey()).then(x=>{
        x.forEach(xx=>{
            writeOnHistory(xx.text,true);
        })
    })
}
function  Tkey(){
    return name+"|"+roomNo+"|"+imgID+"|"+"t";
}
function writeOnHistory(text,dont_store) {
    console.log("writeOnHistory");
    if(!dont_store)
    {
        console.log("sotre talk"+ text);
        RoomStore(Tkey(),{text:text});
    }
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    history.scrollTop = history.scrollHeight;
    document.getElementById('chat_input').value = '';
}
/**back to the homepage */
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







