const router = require('express').Router();
const clientJWTChecker = require('../middleware/clientJWTCheck');

router.get('/', clientJWTChecker);

module.exports = router;