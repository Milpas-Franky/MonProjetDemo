const express = require('express');
const router = express.Router();
const debug = require('debug')('monprojetdemo:api:student');
const connection = require('../db_connect').connection;
const { student} = require('../models/students'); 

/* GET users listing. */
router.get('/', async function(req, res, next) {
  debug("List students");
  const students = await student.findAll();
  res.json(students); 
});

router.post('/, async (req, res) => {
  debug("Create new Student"); 
  const newStudent = res.body; 
  const storedStudent = await student.create(nom); 
  const generatedId = storeStudent.id; 
  res.set("Location", `${req.baseUrl}`)
}
 

router.post('/', (req, res) => {
  debug("Create new student");
  const newStudent = req.body;
  connection.query(
    'INSERT INTO `students` (firstName, lastName) VALUES (?, ?)',
    [ newStudent.firstName, newStudent.lastName ],
    (err, results, fields) => {
      if (err) {
        debug(err);
      } else {
        res.status(201).send("Student created");
      }
    }
  );
});

router.get('/:id', (req, res) => {
  debug("Get student details");
  const studentId = req.params.id;
  connection.query(
    'SELECT * FROM `students` WHERE id = ?',
    [ studentId ],
    (err, results, fields) => {
      if (err) {
        debug(err);
      } else {
        if (results.length === 1) {
          res.json(results[0]);
        } else {
          res.status(404).send("Student not found");
        }
      }
    }
  );
});

router.delete('/:id', async (req, res) => {
  debug("Delete student");
  const studentId = req.params.id;
  const student = await student.findByPk(studentId); 
  if (student )

  connection.query(
    'DELETE FROM `students` WHERE id = ?',
    [ studentId ],
    (err, results, fields) => {
      if (err) {
        debug(err);
      } else {
        res.status(204).send();
      }
    }
  );
});

module.exports = router;
