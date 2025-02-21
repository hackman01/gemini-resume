const express = require('express');
const { parseResume, findResume } = require('../controllers/resume.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();


router.post('/parse-resume',authMiddleware, parseResume);
router.get('/find-resume',authMiddleware ,findResume)



module.exports = router 