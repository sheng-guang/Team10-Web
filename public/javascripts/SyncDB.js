async function syncDB(){
    // console.log("syncDB()");

    //----------------------------------------------------------------------------------------------------------------------------------------
    try {
        var netList= await axios.post("/story/download",{});
        netList=netList.data;
    }
    catch (e){
        console.log("offline mode");
        throw  e
    }
    let Locallist= await  GetAllStory();
    console.log("net: "+netList);
    console.log("local: "+Locallist);


//----------------------------------------------------------------------------------------------------------------------------------------
    let Local_dictionary={}
    Locallist.forEach(x=>{
        Local_dictionary[x.Id]=x;
    })

    let net_dictionary={}
    netList.forEach(x=>{
        net_dictionary[x.Id]=x;
    })


//----------------------------------------------------------------------------------------------------------------------------------------
    let toStore=[];
    for (let i=0;i<netList.length;i++){
        const x = netList[i];
        if(Local_dictionary[x.Id])continue;
        toStore.push(x);
        try {
            await StoreStory(x);
        }
        catch (e){
            console.log(e);
        }
    }
    console.log("to store: "+toStore);

    let tosend=[];
    for (let i = 0; i < Locallist.length; i++){
        const x = Locallist[i];
        if(net_dictionary[x.Id])continue;
        tosend.push(x);
        try {
            await  axios.post('/story/upload',x);
        }
        catch (e){
            console.log(e);
        }
    }
    console.log("to  send: "+tosend);




}