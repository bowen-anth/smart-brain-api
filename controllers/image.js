const { json } = require('body-parser');
const Clarifai = require('clarifai');
// const dotenv = require('dotenv').config();

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
  });

  console.log(process.env.CLARIFAI_KEY)

 const handleApiCall = (req, res) => { 
app.models
    .predict('53e1df302c079b3db8a0a36033ed2d15', req.body.input)
    .then(data => {
        res.json(data);
    })
    // .catch(err => res.status(400).json('Unable to work with API'))
    .catch(err => console.log(err))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}