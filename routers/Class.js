const express = require('express');
const router = express.Router();
const {createClass,createClasses,getAllClass,deleteClass,updateClass,getUpcomingClasses} = require("../controllers/Class");
const {Required} = require("../Verification/Verify");

router.post('/', Required, createClass);
router.post('/all', Required, createClasses);
router.get('/', Required, getAllClass);
router.get('/coming', Required, getUpcomingClasses);
router.delete('/:id', Required, deleteClass);
router.put('/:id', Required, updateClass);


module.exports = router;
