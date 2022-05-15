console.log("123");

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
    ne.title=document.getElementById("title1").value;
    ne.picture=document.getElementById("img").src;
    ne.description=document.getElementById("description1").value;
    ne.author=document.getElementById("author1").value;

    ne.date=getDate()
    ne.t= Date.parse(new Date());


    send_store(ne).then(x=>{
        // ToHomePage();
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
    let  re=await axios.post('/story/upload',{
        id:ne.id,
        date:ne.date,
        timestamps:ne.t,
        title:ne.title,
        description:ne.description,
        author:ne.author,
        picture:ne.picture,
    });
    console.log(re);
}

function ToHomePage(){
    location.href="http://localhost:3000"
}
function imgChange(event){
    console.log(event.target.files)
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log(e.target.result);
        if ((e.target.result).includes('image'))
        {
            document.getElementById("img").src=e.target.result;
        }
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
console.log("123");
// document.getElementById("upload3").onclick="send()";