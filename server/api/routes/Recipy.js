const express = require('express')
const router = require('express').Router()
const upload = require('../middelwars/Upload')


const { getByUser, newRecipy, deleteRecipy, getAll, recipyByUser, updateRecipy, deleteRecipyByUser } = require('../controllers/Recipy')

// router.get('/:id', getByUser)
router.post('/:name/:password', newRecipy)
// upload.single('image'),
router.delete('/:name', deleteRecipy)
router.get('/', getAll)
router.get('/:userId', recipyByUser)
router.delete('/:idRecipy/:name/:password', deleteRecipyByUser)
// router.post('/:idRecipy/:name/:password', deleteRecipyByUser)

router.put('/:recipyId', updateRecipy)

module.exports = router