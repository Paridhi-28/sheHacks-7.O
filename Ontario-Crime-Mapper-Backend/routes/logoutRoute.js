const router = require('express').Router();
const logout = require('../middleware/logout');

router.get('/', logout.handleLogout);

module.exports = router;