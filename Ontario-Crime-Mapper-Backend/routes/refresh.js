const router = require('express').Router();
const refreshToken = require('../middleware/refreshToken');

router.get('/', refreshToken.handleRefreshToken);

module.exports = router;