const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
// const auth = require('../middleware/auth'); // Assuming you have auth middleware

// Mock auth middleware for now to ensure code is self-contained
const auth = (req, res, next) => {
    // Mock user for "just create required files" request
    req.user = { id: 'mock_user_id' };
    next();
};

router.post('/initiate', auth, paymentController.initiatePayment);
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
