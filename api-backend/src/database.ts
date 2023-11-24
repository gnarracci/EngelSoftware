import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo/engelApp', {

})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));