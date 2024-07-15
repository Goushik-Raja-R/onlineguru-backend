const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017/ProDB', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
        console.log('Database Connected Successfully');
    });
}

module.exports.connectToDatabase = connectToDatabase;
