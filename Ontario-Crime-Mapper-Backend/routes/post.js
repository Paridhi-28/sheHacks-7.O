const router = require("express").Router();
// const verify = require('./verifyToken');

router.get('/', (req, res) => {
    return res.status(200).json({message: `${req._id}`})


    
})

module.exports = router