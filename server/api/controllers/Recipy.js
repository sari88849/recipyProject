const Recipy = require('../models/Recipy')
const User = require('../models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// פונקצייה שמביאה מתכון ע"פ בנ"א-שם וסיסמא
const getByUser = (req, res) => {
    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    const userId = req.body.id
    User.findById(userId).then((user) => {
        if (user == null) {
            res.status(404).json({
                message: 'user not found'
            })
        }
    }).then(() => {
        Recipy.find().populate(userId).then((recipy) => {
            res.status(200).json({
                token: token,
                recipy
            })
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}

// פונקצייה שמביאה את כל המתכונים
const getAll = (req, res) => {
    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    Recipy.find().then((recipy) => {
        res.status(200).json({
            token: token,
            recipy
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}

//הוספת מתכון חדש
const newRecipy = async (req, res) => {
    // const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    try {
        const { name, content, link, image } = req.body.data
        console.log(req.body.data);



        const recipy = new Recipy({
            _id: mongoose.Types.ObjectId(),
            name,
            content,
            image,
            link
        })

        const recipys = await Recipy.findById(recipy._id);

        // console.log(recipys.length)

        // for (let i = 0; i <= recipys.length; i++) {
        //     // if (i._id===recipy._id){
        //     console.log(i._id + ', ' + recipy._id)
        //     // }
        // }



        // if (recipys) {
        //     alert('המתכון קיים- אני לא מוסיף')
        // }
        // else {
        await recipy.save()
        // console.log("post:" + newPost)
        const user = await User.findOne({ "name": req.params.name, "password": req.params.password })
        // if (!user.recipy.includes(recipy._id)) {}
        // if (!user.recipy.includes(recipy._id)) {
        //     alert('המתכון קיים- ולא נוסף')
        // }

        if (recipy._id)
            user.recipy.push(recipy._id)
        await user.save()
        console.log(user)

        res.status(200).json({
            token: token,
            recipy: recipy
        })
    }
    catch (err) {
        res.status(500).json({ error: err })
        console.log(err)
    }

}

// מחיקת מתכון ע"פ בנ"א
const deleteRecipyByUser = async (req, res) => {
    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    console.log('gfgggggggggggggggggggggg')
    console.log(req.params.name)
    try {
        const recipy = await Recipy.findById(req.params.idRecipy)
        // console.log(`blog: ${blog}`)
        const user = await User.findOneAndUpdate({ "name": req.params.name, "password": req.params.password }, { $pull: { recipy: recipy._id } })
        // await blog.remove();
        await user.save();
        res.status(200).json({
            token: token,
            message: "the recipy is deleted"
        });
    }
    catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

// מחיקת מתכון

const deleteRecipy = (req, res) => {
    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    Recipy.findOneAndDelete({ "name": req.body.name }).then(() => {
        res.status(200).json({
            token: token,
            message: 'delete recipy'
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}

// פונקצייה שמביאה מתכון ע"פ בנ"א-שם וסיסמא
const recipyByUser = (req, res) => {
    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    Recipy.find().populate(user).then((recipy) => {
        res.status(200).json({
            token: token,
            recipy
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}

// פונקצייה שמעדכנת מתכון
const updateRecipy = (req, res) => {

    const token = jwt.verify(req.headers.authorization, process.env.ENV_KEY)

    const recipyId = req.params.recipyId
    Recipy.findByIdAndUpdate({ _id: recipyId }, req.body).then(() => {
        console.log('recipyId', recipyId)
        console.log(req.body)
        res.status(200).json({
            token: token,
            message: 'recipy update'
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}
// deleteRecipyByUser
module.exports = { getByUser, newRecipy, deleteRecipy, getAll, recipyByUser, updateRecipy, deleteRecipyByUser }