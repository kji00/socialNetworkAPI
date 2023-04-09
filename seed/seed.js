const db = require('../config/connection');
const {User, Thought}= require('../models');


const userData = require('./userSeed.json');
const thoughtData = require('./thoughtSeed.json');



db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await Thought.deleteMany({});
  
    // bulk create each model
    const users = await User.insertMany(userData);
    const thought = await Thought.insertMany(thoughtData);

    
console.log("seed complete")
    process.exit(0);
});