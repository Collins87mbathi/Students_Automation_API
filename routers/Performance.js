const express = require('express');
const router = express.Router();
const {createPerformances,getAllPerformances} = require("../controllers/Performance");
const {Required} = require("../Verification/Verify");

router.post('/', Required, createPerformances);
router.get('/', Required, getAllPerformances);

module.exports = router;