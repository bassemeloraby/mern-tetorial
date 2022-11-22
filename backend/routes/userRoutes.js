const express = require('express');

const router = express.Router();
const {
  rgisterUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

//protect routes
const {protect} = require('../middleware/authMiddleware')

router.post('/', rgisterUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe);

module.exports = router;
