const express = require('express');
const router = express.Router();
const assignmentController = require("../controllers/Assignment");
const { Required } = require('../Verification/Verify');


router.post('/',Required ,assignmentController.create);
router.get('/',Required,assignmentController.getAll);
router.put('/:id',Required,assignmentController.update);
router.delete('/:id',Required,assignmentController.delete);

module.exports = router;