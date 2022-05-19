/**
 *
 *  Use axios to store story to net
 *  Store story to indexDB
 *
 *
 * @author scs21yw  Yixang Wang
 */
function  getDate(){
    let d=new Date();
    var re=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
    re+=" "+d.getHours()+":"+d.getMinutes();
    console.log(re);
    return re;
}
function send() {
    console.log("Send enter");
    var ne={}
    ne.Date=getDate()
    ne.Timestamp= Date.parse(new Date());
    ne.ImageTitle=document.getElementById("title1").value;
    ne.Description=document.getElementById("description1").value;
    ne.Author=document.getElementById("author1").value;
    ne.Picture=document.getElementById("img").src;
    ne.Id=ne.Timestamp;

    send_store(ne).then(x=>{
        ToHomePage();
    }).catch(x=>{
        alert(x);
    }).finally(()=>{

    })

}
async function send_store(ne){
    try {                 await StoreStory(ne);            }
    catch (e){                 alert(e);             }
    try {                 await SendToServer(ne)             }
    catch (e){                 alert(e);             }
}
async function  SendToServer(ne){
    let  re=await axios.post('/story/upload',ne);
}

function ToHomePage(){
    location.href="http://localhost:3000"
}
function imgChange(event){
    console.log(event.target.files)
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        if ((e.target.result).includes('image'))
        {
            document.getElementById("img").src=e.target.result;
        }
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
// document.getElementById("upload3").onclick="send()";