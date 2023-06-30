const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');   

const app = express();


app.use(morgan('dev'));


// secure apps by setting various HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));

// enable cors
app.options('*', cors());
app.use(cors());

// DB connection

try {
    mongoose.connect('mongodb+srv://alejandrogrc:kLvAhFOFjBVeillF@cluster0.0alpzh1.mongodb.net/?retryWrites=true&w=majority',
        {useNewUrlParser: true, useUnifiedTopology: true});
} catch (error) {
    console.log(error);
}

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

// Routes
app.use('/api', routes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});