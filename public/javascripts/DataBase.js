/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */

import * as idb from "./idb.js";

var db;

const DB_Name= 'db_Secrets';

function ensure_Collection(db,to){
    console.log(to);
    if (db.objectStoreNames.contains(to))return;
    let Store = db.createObjectStore(to, {
        keyPath: 'id',
        autoIncrement: true
    });

}
var toCreat={}
function upgrade(db,oldVersion, newVersion){
    console.log("idb upgrade to"+newVersion);
    for (var key in toCreat) {
        ensure_Collection(db,key);
    }

}
window.initDatabase=async function initDatabase(collection_name){
    // console.log('ensure '+collection_name);
    if(!db)db=await idb.openDB(DB_Name);
    // console.log(db.objectStoreNames);
    if(db.objectStoreNames.contains(collection_name))return;
   if( !toCreat[collection_name]){
        toCreat[collection_name]="";
    }
   console.log(toCreat);
   await db.close();
    db=await idb.openDB(DB_Name,db.version+1,{upgrade});
}


const stories="stories";
window.StoreStory=async function StoreStory(storyObj){
    await initDatabase(stories);
    if(!db)return;
    try{
        let tx = await db.transaction(stories, 'readwrite');
        let store = await tx.objectStore(stories);
        await store.put(storyObj);
        await  tx.complete;
        console.log('added item to the store! '+ JSON.stringify(storyObj));
    } catch(error) {
        console.log('error: I could not store the element. Reason: '+error);
    }

}

window.GetAllStory=async function GetAllStory(){
    await initDatabase(stories);
    if(!db)return;
    try{
        let tx = await db.transaction(stories, 'readonly');
        let store = await tx.objectStore(stories);
        let all=  store.getAll();
        return all;
    } catch(error) {
        console.log('error: I could not store the element. Reason: '+error);
    }
}
window.GetOneStory=async function(i){
    i=parseInt(i);
    console.log("get story "+i+typeof (i));
    await initDatabase(stories);
    if(!db)return;
    try{
        let tx = await db.transaction(stories, 'readonly');
        let store = await tx.objectStore(stories);
        return  store.get(i);
    } catch(error) {
        console.log('error: I could not get the element. Reason: '+error);
    }
}

window.RoomStore=async  function RoomStore(username,room,kind,v){
    let key=username+"|"+room+"|"+kind;
    await initDatabase(key);
    if(!db)return;
    let to=v;
    try{
        let tx = await db.transaction(key, 'readwrite');
        let store = await tx.objectStore(key);
        await store.put(to);
        await  tx.complete;
        // console.log('added item to the store! '+ JSON.stringify(to));
    } catch(error) {
        console.log('error: I could not store the element. Reason: '+error);
    }
}
window.RoomGet=async function RoomGet(username,room,kind){
    let key=username+"|"+room+"|"+kind;
    await initDatabase(key);
    if(!db)return;
    try{
        let tx = await db.transaction(key, 'readonly');
        let store = await tx.objectStore(key);
        let all=  store.getAll();
        return all;
    } catch(error) {
        console.log('error: I could not store the element. Reason: '+error);
    }
}
