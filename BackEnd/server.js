const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const strConnection = 'mongodb+srv://admin:admin@cluster0.hrgmz.mongodb.net/MyFilms?retryWrites=true&w=majority';
mongoose.connect(strConnection, {useNewUrlParser: true});

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    Title:String,
    Year:String,
    Poster:String
})

const movieModel = mongoose.model('film', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/movies', (req, res) => {
    
    movieModel.find((err,data)=>{
        res.json(data);
    })
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    
})

app.get('/api/movies/:id',(req, res)=>{

    console.log(req.params.id);

    movieModel.findById(req.params.id, (err,data)=>{
        res.json(data);
    })
})
//Server Side App.put that will find and update a record
//Listen for this method at server
app.put('/api/movies/:id', (req, res) =>{
    console.log("Update" +req.params.id);
    //Update from database MovieModel
    movieModel.findByIdAndUpdate(req.params.id, 
        req.body,
        (err, data) =>{
            res.status(200).send(data);
        })
})

app.delete('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    movieModel.findByIdAndDelete({_id:req.params.id},
         (err, data)=>{
        res.send(data);
    })
})


app.post('/api/movies', (req, res) => {
    console.log(req.body);

    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    })
    .then(()=>{
        res.send("Movie Added")
    })
    .catch();

    res.send('Data Recieved!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})