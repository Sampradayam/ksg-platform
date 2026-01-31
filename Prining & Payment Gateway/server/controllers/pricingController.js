const pricingService = require('../services/pricingService');

exports.applyCoupon = async (req, res) => {
    try {
        const { couponCode, cartTotal } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!couponCode) {
            return res.status(400).json({ success: false, message: 'Coupon code is required' });
        }

        // validate
        const coupon = await pricingService.validateCoupon(couponCode, userId, cartTotal);

        // calculate
        const calculation = pricingService.calculateTotal(cartTotal, coupon);

        res.status(200).json({
            success: true,
            message: 'Coupon applied successfully',
            coupon: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value
            },
            ...calculation
        });

    } catch (error) {
        // Distinguish between validation errors (400) and system errors (500) if needed
        // For simplicity, returning 400 for logic errors here
        res.status(400).json({ success: false, message: error.message });
    }
};
