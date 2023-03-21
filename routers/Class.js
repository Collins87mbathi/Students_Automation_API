const express = require('express');
const router = express.Router();
const {createClass,getAllClass,getClassById,deleteClass,updateClass} = require("../controllers/Class");
const {Required} = require("../Verification/Verify");

router.post('/', Required, createClass);
router.get('/', Required, getAllClass);
router.delete('/:id', Required, deleteClass);
router.put('/:id', Required, updateClass);
router.get('/:id',Required,getClassById);


module.exports = router;
