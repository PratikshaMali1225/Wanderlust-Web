const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlustweb";
main().
then(() => {
console.log("connected to DB");
})
.catch(err => {
    console.log(err);
});
async function main() {   
    await mongoose.connect(MONGO_URL);  //connecting DB 
};
 const initDB = async () => {
await  Listing.deleteMany({});
initdata.data = initdata.data.map((obj) => ({...obj, owner:"65c9c8c284cd51aa3ab30a6e"})); //demo4
await  Listing.insertMany(initdata.data);
console.log("data was initilizes");
 };
 initDB();
 
 //65c8d9fb9fa7c206cf05a2bf

