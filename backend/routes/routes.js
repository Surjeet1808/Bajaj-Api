const express = require('express');
const { handelGet, handelPost } = require('../controllers/controller');

const router = express.Router();

router.post('/bfhl', handelPost);
router.get('/bfhl', handelGet);

module.exports = router;
