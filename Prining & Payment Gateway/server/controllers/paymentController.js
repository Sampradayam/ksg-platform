const Payment = require('../models/Payment');
const paymentService = require('../services/paymentService');

// Initiate Payment
exports.initiatePayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const userId = req.user.id; // Assuming auth middleware adds user to req

        // Create order via service
        const order = await paymentService.createOrder(amount, currency);

        // Save initial payment record
        const newPayment = new Payment({
            userId,
            orderId: order.id,
            amount: amount,
            currency: order.currency,
            status: 'created'
        });

        await newPayment.save();

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID // Send key to client (public key is safe)
        });

    } catch (error) {
        console.error('Initiate Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment initiation failed' });
    }
};

// Handle Webhook / Callback Verification
exports.handleWebhook = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const isValid = paymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Invalid Signature' });
        }

        // Atomic update of payment status
        const payment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                status: 'paid',
                paymentId: razorpay_payment_id,
                signature: razorpay_signature
            },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // TODO: Update user enrollment or other atomic actions here if needed
        // await User.findByIdAndUpdate(payment.userId, { $addToSet: { courses: ... } });

        res.status(200).json({ success: true, message: 'Payment verified successfully' });

    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).json({ success: false, message: 'Webhook processing failed' });
    }
};
