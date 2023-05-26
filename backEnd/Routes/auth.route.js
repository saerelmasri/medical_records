const { Router } = require('express');
const router = Router();
const { register, login, typeDecode } = require('../Controllers/auth.controllers')

router.post('/register', register);
router.post('/login', login);
router.get('/typeDecode', typeDecode);

module.exports = router