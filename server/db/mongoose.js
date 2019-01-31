var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NotebookApp', (error)=>{
    if (error){
        console.log('Could not connect to MongoDB');
    }
});

module.exports = {mongoose};