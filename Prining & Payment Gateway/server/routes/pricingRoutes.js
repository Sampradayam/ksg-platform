const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

// Mock auth middleware (same as payment)
const auth = (req, res, next) => {
    req.user = { id: 'mock_user_id' };
    next();
};

router.post('/apply-coupon', auth, pricingController.applyCoupon);

module.exports = router;
