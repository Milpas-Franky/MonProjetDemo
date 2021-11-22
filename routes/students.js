const express = require('express');
const router = express.Router();
const debug = require('debug')('monprojetdemo:api:student');
const connection = require('../db_connect').connection;
const { student, Student} = require('../models/students'); 

/* GET users listing. */
router.get('/', async function(req, res, next) {
  debug("List students");
  const students = await student.findAll();
  res.json(students); 
});

router.post('/', async (req, res) => {
  debug("Create new Student"); 
  const newStudent = res.body; 
  const storedStudent = await student.create(newStudent); 
  const generatedId = storeStudent.id; 
  res.set("Location", `${req.baseUrl}/${generatedId}`)
  res.status(201).send("Student created"); 
});
 
router.get('/:id', async (req, res) => {
  debug("Get student details"); 
  const studentId = req.params.id; 
  const student = await Student.findByPk(studentId);
  if (Student !== null) {
  res.json(student);
  } else {
    res.status(404).send("Student not found"); 
  }
});

router.delete('/:id', async (req, res) => {
  debug("Delete new student");
  const StudentId = req.params.id;
  const Student = await Student.findByPk(StudentId);
  if (student !== null) {
    await student.destroy();
    res.status(204).send("Student deleted"); 
  } else {
    res.status(404).send("Student not found");
  }
});

module.exports = router;
