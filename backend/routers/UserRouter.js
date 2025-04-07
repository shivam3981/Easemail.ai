const express = require('express');

const router = express.Router();

router.get('/',(req,res) => {res.send('response from add')});

//getall
router.get('/getall',(req,res) => {res.send('response from getall')});

//getbyid
router.get('/getbyid',(req,res) => {res.send('response from getbyid')});

//delete
router.get('/delete',(req,res) => {res.send('response from delete')});

//update
router.get('/update',(req,res) => {res.send('response from update')});

module.exports = router;