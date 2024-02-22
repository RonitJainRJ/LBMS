const express = require('express');
const router = express.Router();

const addStudent = require('../controller/addStudentController');
router.route("/addStudent").post(addStudent);

const getStudents = require('../controller/getStudentsController');
router.route("/getStudents").get(getStudents);

const getStudentBySeat = require('../controller/getStudentBySeatController.js');
router.route("/getStudentBySeat").get(getStudentBySeat);

const deleteStudentBySeat = require('../controller/deleteStudentBySeatController.js');
router.route("/deleteStudentBySeat").delete(deleteStudentBySeat);

const updateStudent = require('../controller/updateStudentController.js');
router.route("/updateStudent").put(updateStudent);

module.exports = router