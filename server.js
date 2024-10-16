const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => console.log(`connected to MongoDB ${mongoose.connection.name}`));

const Beef = require('./models/beef');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/beef', async (req, res) => {
    const allBeefs = await Beef.find();
    
    res.render('index.ejs', { beefs: allBeefs });
});

app.get('/beef/new', (req, res) => {
    res.render('beef/new.ejs')
});

app.post('/beef', async (req, res) => {

    await Beef.create(req.body);
    res.redirect('/beef');
});

app.get('/beef/name/:name/edit', async (req, res) => {
    const beef = await Beef.findOne({ name: req.params.name});
    
    res.render('beef/edit.ejs', { beef });
});

app.put('/beef/name/:name', async (req, res) => {
    await Beef.findOneAndUpdate({ name: req.params.name}, req.body);
    
    res.redirect('/beef');
});

app.delete('/beef/name/:name', async (req, res) => {
    await Beef.findOneAndDelete(req.params.name);
    
    res.redirect('/beef');
});

app.listen(3000, () => {
    console.log('listening on port 3000...')
});