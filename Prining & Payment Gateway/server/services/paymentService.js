const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
// NOTE: Use environment variables in production
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * Create an order in Razorpay
 * @param {number} amount - Amount in smallest currency unit (e.g., paise)
 * @param {string} currency - Currency code (e.g., INR)
 * @returns {Promise<Object>} - The order object
 */
const createOrder = async (amount, currency = 'INR') => {
    const options = {
        amount: amount,
        currency: currency,
        receipt: `receipt_${Date.now()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw new Error('Razorpay Order Creation Failed: ' + error.message);
    }
};

/**
 * Verify the payment signature from Razorpay webhook/callback
 * @param {string} orderId - The order ID from Razorpay
 * @param {string} paymentId - The payment ID from Razorpay
 * @param {string} signature - The signature to verify
 * @returns {boolean} - True if signature is valid
 */
const verifySignature = (orderId, paymentId, signature) => {
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');

    return generatedSignature === signature;
};

module.exports = {
    createOrder,
    verifySignature
};
