const express = require('express');
const { getStudents, createStudent, studentForm, singleStudent, editForm, editStudent, deleteStudent, deleteShow } = require('../controllers/studentController');
const router = express.Router()
const multer = require('multer');
const path = require('path')

// Multer setup
const storage = multer.diskStorage({
    filename : (req, file ,cb) => {
        let ext = path.extname(file.originalname)
        const unique_name = `${file.fieldname}_${Date.now()}${ext}`
        cb(null, unique_name)
    },
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets/upload/images'))
    }
})

const upload = multer({
    storage : storage
}).single('photo')


// Student router
router.get('/', getStudents)
router.get('/create', studentForm)
router.post('/', upload, createStudent)
router.get('/:username', singleStudent)
router.get('/edit/:username', editForm)
router.post('/edit/:id',upload, editStudent)
router.get('/delete/:username', deleteShow)
router.get('/deleted/:id', deleteStudent)

// router export
module.exports = router