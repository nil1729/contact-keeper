const mongoose = require('mongoose');
const config = require('config');
module.exports = async () => {
    try{
        await mongoose.connect(config.get('mongoURI'), {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB Connected .....');
    }catch(e){
        console.log('Refused To Connect....');
    }
};