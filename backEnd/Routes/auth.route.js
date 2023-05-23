const { Router } = require('express');
const router = Router();
const { register, login } = require('../Controllers/auth.controllers')

router.post('/register', register);
router.get('/login', login);

module.exports = router