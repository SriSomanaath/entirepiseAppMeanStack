const express = require('express');
const router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

const { Employee } = require('../models/employee');

// => localhost:3000/employees/
router.get('/', (req, res) => {
  Employee.find()
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
        console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
      res.status(500).send('Error in Retrieving Employees');
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id)
    .then(docs =>{
        res.send(docs);
    })
    .catch(err =>{
        console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); 
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save()
    .then(docs =>{
        res.send(docs);
    })
    .catch(err=>{ 
        console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id: ${req.params.id}`);
  
    var emp = {
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
    };
  
    Employee.findByIdAndUpdate(req.params.id, emp)
      .then(updatedEmp => {
        if (!updatedEmp) {
          return res.status(404).send(`No record found with id: ${req.params.id}`);
        }
        res.send(updatedEmp);
      })
      .catch(err => {
        console.log('Error in Employee Update: ' + JSON.stringify(err, undefined, 2));
        res.status(500).send('Error in Employee Update');
      });
  });
  
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        
    Employee.findByIdAndRemove(req.params.id)
      .then(updatedEmp => {
        if (!updatedEmp) {
          return res.status(404).send(`No record found with id: ${req.params.id}`);
        }
        res.send(updatedEmp);
      })
      .catch(err => {
        console.log('Error in Employee Update: ' + JSON.stringify(err, undefined, 2));
        res.status(500).send('Error in Employee Update');
      });
});


module.exports = router;
