const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');


connectDB();
app.use(express.json({extended: false}));


app.use('/api/users', require('./routes/users'));
app.use('/api/auths', require('./routes/auths'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static assests in Production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT , process.env.IP, ()=>{
    console.log(`Server Started on Port ${PORT}`);
});