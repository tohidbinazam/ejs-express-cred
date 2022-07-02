const studentModel = require("../models/studentModel");
const bcryptjs = require('bcryptjs')
const fs = require('fs');
const path = require("path");

/**
 * @desc Get all students
 * @name GET /student
 * @access public
 */
const getStudents = async (req, res) => {
    let students = await studentModel.find()
    res.render('index', { students })
}

/**
 * @desc Show Add new student form
 * @name GET /student/create
 * @access public
 */
const studentForm = (req, res) => {
    res.render('create')
}


/**
 * @desc Add new student
 * @name POST /student
 * @access public
 */
const createStudent = async (req, res) => {
    // Hash password
    let password = await bcryptjs.hash(req.body.password, 12)

    let file = req.file ? req.file.filename : undefined
    console.log(req.body);
    await studentModel.create({...req.body, photo: file, password})
    res.redirect('/student')
}


/**
 * @desc Get single student data
 * @name GET /student/:username 
 * @access public 
 */
const singleStudent = async (req, res) => {
    let username = req.params.username
    let student = await studentModel.findOne({ username })

    res.render('show', {student})
}


/**
 * @desc Show only edit form with data
 * @name GET /student/edit/:username
 * @access public
 */
const editForm = async (req, res) => {
    let username = req.params.username
    let student = await studentModel.findOne({ username })
    res.render('edit', { student })
}


/**
 * @desc Edit student data
 * @name POST /student/edit/:id
 * @access public
 */
const editStudent = async (req, res) => {
    let id = req.params.id

    let file = req.body.old_photo
    if (req.file) {
        file = req.file.filename 
        fs.unlink(path.join(__dirname, `../assets/upload/images/${req.body.old_photo}`), (error) => {
           console.log(`File removed /assets/upload/images/${req.body.old_photo}`);
        })
    }

    await studentModel.findByIdAndUpdate(id, {...req.body, photo: file}, { new: true })
    res.redirect('/student')
}


/**
 * @desc Show only delete form with data
 * @name POST /student/delete/:username
 * @access public
 */
const deleteShow = async (req, res) => {
    let username = req.params.username
    let student = await studentModel.findOne({username})

    res.render('delete', {student})
}


/**
 * @desc Delete student data
 * @name POST /student/deleted/:id
 * @access public
 */
const deleteStudent = async (req, res) => {
    let id = req.params.id
    await studentModel.findByIdAndDelete(id)

    res.redirect('/student')
}


module.exports = { getStudents, createStudent, studentForm, singleStudent, editForm, editStudent, deleteShow, deleteStudent }