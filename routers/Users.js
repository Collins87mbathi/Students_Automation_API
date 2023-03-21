const {Login,Register,GetUser} = require("../controllers/Users");
const express =  require("express");
const router = express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/',GetUser);


module.exports = router;