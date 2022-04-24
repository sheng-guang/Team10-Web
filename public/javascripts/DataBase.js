/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */

import * as idb from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';


////////////////// DATABASE //////////////////
// the database receives from the server the following structure

/** class WeatherForecast{
 *  constructor (location, date, forecast, temperature, wind, precipitations) {
 *    this.location= location;
 *    this.date= date,
 *    this.forecast=forecast;
 *    this.temperature= temperature;
 *    this.wind= wind;
 *    this.precipitations= precipitations;
 *  }
 *}
 */
let db;

const DB_Name= 'db_Secrets';
const STORY_NAME= 'stories';

/**
 * it inits the database and creates an index for the sum field
 */
async function initDatabase(){
    if (!db) {
        db = await idb.openDB(DB_Name, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(STORY_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(STORY_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    // sumsDB.createIndex('sum', 'sum', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase= initDatabase;

async function StoreStory(storyObj){
    if(!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(STORY_NAME, 'readwrite');
            let store = await tx.objectStore(STORY_NAME);
            await store.put(storyObj);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(sumObject));
        } catch(error) {
            console.log('error: I could not store the element. Reason: '+error);
        }
    }

}
window.StoreStory= StoreStory;


async function GetAllStory(){
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(STORY_NAME, 'readonly');
            let store = await tx.objectStore(STORY_NAME);
            let all=  store.getAll();
            // console.log("================================get all  ");
            // console.log(all);
            // console.log("get all  ================================");

            return all;
        } catch(error) {
            console.log('error: I could not store the element. Reason: '+error);
        }
    }
}
window.GetAllStory=GetAllStory;

async  function StoryTalk(){

}
