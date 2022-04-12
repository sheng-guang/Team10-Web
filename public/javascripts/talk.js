function sendMsg(text){

}
function listenMsg(action){

}

var events={}
function  saveDrawEventToIndexDB(pictureID,roomID,event){
let key=pictureID+"|"+roomID;
if(!events[key])events[key]=[];
var to=events[key];
to[key].push(event);

}

function  getAllDrawEventFromIndexDB(pictureID,roomID,event)
{
    if(!events[key])events[key]=[];
    return events[key];

}
