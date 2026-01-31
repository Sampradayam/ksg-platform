const Coupon = require('../models/Coupon');

/**
 * Validate a coupon code for a specific user and cart value
 * @param {string} code - Coupon code
 * @param {string} userId - User ID (for per-user limits, logically extended here)
 * @param {number} cartTotal - Total value of items in cart
 * @returns {Promise<Object>} - The valid coupon object
 */
const validateCoupon = async (code, userId, cartTotal) => {
    const coupon = await Coupon.findOne({
        code: code.toUpperCase(),
        isActive: true
    });

    if (!coupon) {
        throw new Error('Invalid coupon code');
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
        throw new Error('Coupon is expired or not yet active');
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
        throw new Error('Coupon usage limit reached');
    }

    if (cartTotal < coupon.minOrderValue) {
        throw new Error(`Minimum order value of ${coupon.minOrderValue} required`);
    }

    return coupon;
};

/**
 * Calculate the total price with discount
 * @param {number} subtotal - The initial total
 * @param {Object} coupon - The validated coupon object
 * @returns {Object} - { subtotal, discount, total }
 */
const calculateTotal = (subtotal, coupon) => {
    let discount = 0;

    if (coupon) {
        if (coupon.type === 'percentage') {
            discount = (subtotal * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
            discount = coupon.value;
        }

        // Ensure discount doesn't exceed subtotal
        if (discount > subtotal) {
            discount = subtotal;
        }
    }

    // Deterministic rounding to 2 decimal places
    discount = Math.round(discount * 100) / 100;
    const total = Math.round((subtotal - discount) * 100) / 100;

    return {
        subtotal,
        discount,
        total
    };
};

module.exports = {
    validateCoupon,
    calculateTotal
};
