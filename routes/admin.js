
// import express from 'express';

// import Admin from '../controller/admin';

const express = require('express');
const Admin = require('../controller/admin').Class;

const admin = new Admin();

const router = express.Router();

router.post('/login', admin.login);
router.post('/registe', admin.registe);







module.exports = router;

