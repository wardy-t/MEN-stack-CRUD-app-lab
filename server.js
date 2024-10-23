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
    
    res.render('beef/index.ejs', { beefs: allBeefs });
});

app.get('/beef/new', (req, res) => {
    res.render('beef/new.ejs')
});

app.get('/beef/:id', async (req, res) => {
    const singleBeef = await Beef.findById(req.params.id);
    
    res.render('beef/show.ejs', { beef: singleBeef });
});

app.post('/beef', async (req, res) => {

    await Beef.create(req.body);
    res.redirect('/beef');
});

app.get('/beef/:id/edit', async (req, res) => {
    const beef = await Beef.findById(req.params.id);
    
    res.render('beef/edit.ejs', { beef });
});

app.put('/beef/:id', async (req, res) => {
    await Beef.findByIdAndUpdate(req.params.id, req.body);
    
    res.redirect(`/beef/${req.params.id}`);
});

app.delete('/beef/:id', async (req, res) => {
    await Beef.findByIdAndDelete(req.params.id);
    
    res.redirect('/beef');
});

app.listen(3000, () => {
    console.log('listening on port 3000...')
});