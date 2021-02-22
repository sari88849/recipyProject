const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()


//חיבור למונגו
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@youtub-atricles-api.iunch.mongodb.net/<project>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//אם המונגו מחובר- שיכתוב הודעה שהוא מחובר
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!')
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.use(morgan('dev'));

app.use(express.json());

app.use('/upload', express.static('upload'))


app.use(express.urlencoded({
    extended: false
}));


const UserRoute = require('./api/routes/User')
const RecipyRoute = require('./api/routes/Recipy')
app.use('/user', UserRoute)
app.use('/recipy', RecipyRoute)

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }


    })
}
)


module.exports = app