/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */


/**
 * ensure_Collection(): ensure that indexDB has the collection
 *  store functions : store data
 *  get function: get any kind of data
 *
 * @author scs21yw  Yixang Wang
 */
import * as idb from "./idb.js";

var db;

const DB_Name= 'db_Secrets';

function ensure_Collection(db,to){
    console.log(to);
    if (db.objectStoreNames.contains(to))return;
    let isS=("stories"==to);
    let Store = db.createObjectStore(to, {
        keyPath: 'Id',
        autoIncrement: true,
        unique:true
    });
    Store.createIndex("key","key",{ unique:false})
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
        // console.log('added item to the store! '+ JSON.stringify(storyObj));
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
    // console.log("get story "+i+typeof (i));
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

window.RoomStore=async  function RoomStore(key,v){
console.log("store   "+key+"    "+v);
    await initDatabase("room");
    v.key=key;
    if(!db)return;
    try{
        let tx = await db.transaction("room", 'readwrite');
        let store = await tx.objectStore("room");
        await store.add(v);
        await  tx.complete;
        // console.log('added item to the store! '+ JSON.stringify(to));
    } catch(error) {
        console.log('error: I could not store the element. Reason: '+error);
    }
}
window.RoomGet=async function RoomGet(key){
    await initDatabase("room");
    if(!db)return;
    try{
        let tx = await db.transaction("room", 'readonly');
        let store = await tx.objectStore("room");
        let index=await  store.index("key")
        let re= await index.getAll(IDBKeyRange.only(key));
        return re;

    } catch(error) {
        console.log('error: I could not get the element. Reason: '+error);
    }
}
