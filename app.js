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
        name: {
            type: String,
            required: [true, "Please check your data entry, no name specified!"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });
    const Fruit = mongoose.model("Fruit", fruitSchema);
    const fruit = new Fruit({
        rating: 10,
        review:"Peaches are so yummy"
    });
    // const res = Fruit.deleteOne({review: "Peaches are so yummy"},(error, mongooseDeleteResult)=>{
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log(mongooseDeleteResult);
    //     }
    // });

    fruit.save();

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