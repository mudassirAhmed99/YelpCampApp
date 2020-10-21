const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('DATABASE CONNECTED');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0 ; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5f8927f9cf90630ee8ff1e80',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dhgxohcfp/image/upload/v1603281075/YelpCamp/fbnzrlj7vmspth3ndtae.jpg',
                  filename: 'YelpCamp/fbnzrlj7vmspth3ndtae'
                },
                {
                    url: 'https://res.cloudinary.com/dhgxohcfp/image/upload/v1603281076/YelpCamp/zfayzytwd5ajfx7aquhd.jpg',
                  filename: 'YelpCamp/zfayzytwd5ajfx7aquhd'
                }
              ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas necessitatibus ea dolores ullam sapiente alias, cumque vitae, nam earum similique iste architecto et quo quam dolorum quibusdam, vel excepturi doloremque.',
            price: `${price}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});