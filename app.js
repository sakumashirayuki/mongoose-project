//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log('database connection success!');
    // create section
    // fruit section
    const fruitSchema = new mongoose.Schema({
        name: String,
        rating: Number,
        review: String
    });
    const Fruit = mongoose.model("Fruit", fruitSchema);
    const fruit = new Fruit({
        name: "Apple",
        rating: 7,
        review:"pretty solid as a fruit"
    });
    const kiwi = new Fruit({
        name: "Kiwi",
        rating: 10,
        review: "The best fruit"
    });
    const orange = new Fruit({
        name: "Orange",
        rating: 4,
        review: "Too sour for me"
    });
    const banana = new Fruit({
        name: "Banana",
        rating: 3,
        review: "Weird texture"
    });
    // Fruit.insertMany([kiwi, orange, banana], (error)=>{
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log("Insert successfully!");
    //     }
    // });
    // fruit.save();

    // people section
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number
    });
    const Person = mongoose.model("Person", personSchema);
    const person = new Person({
        name: "John",
        age: 37
    });
    // person.save();

    // read section
    Fruit.find({},(error, fruits)=>{
        if(error){
            console.log(error);
        }else{
            mongoose.connection.close();
            fruits.forEach((fruit)=>{
                console.log(fruit.name);
            });
        }
    });
});