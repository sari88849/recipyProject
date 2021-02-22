const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// פונקצייה שמוצאת בנ"א לפי שם משתמש וסיסמא
const getByIdAndPass = (req, res) => {

    User.findOne({ "name": req.params.name, "password": req.params.password }).then((user) => {
        console.log(req.params.password)
        console.log(req.params.name)

        res.status(200).json({
            user
        })
    }).catch((error) => {
        res.status(500).json({
            error
        })
    })
}

//הוספת משתמש חדש
const newUser = (req, res) => {
    const { name, password } = req.body
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name,
        password,
    })
    console.log(user)

    const secret = 'aaaaa656'

    const token = jwt.sign({ name: name, password: password },
        process.env.ENV_KEY)
    // const token = jwt.sign({ userName: userName, password: password }, process.env.SECRET)


    console.log('token ' + token)

    user.save().then(() => {
        res.status(200).json({
            token: token,
            message: 'user created'
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}

// פונקצייה שמביאה את כל המשתמשים
const getAll = (req, res) => {
    User.find().then((users) => {
        res.status(200).json({
            users
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}

// פונקצייה שמביאה מתכונים לפי בנ"א
const recipyByUser = (req, res) => {
    const userId = req.params.userId
    User.findOne({ "name": req.params.name, "password": req.params.password }).populate("recipy").then((recipy) => {
        res.status(200).json({
            recipy
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}

module.exports = { getByIdAndPass, newUser, getAll, recipyByUser }