const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { prisma } = require('database');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/checkout', verifyToken, async (req, res) => {
  const { paymentMethodId } = req.body;
  
  if (!paymentMethodId) {
    return res.status(400).json({ error: 'Payment method is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mock payment processing...
    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        amount: 19.99, // Mock amount
        status: 'SUCCESS',
        gatewayTransactionId: 'mock-txn-' + Date.now(),
      }
    });

    // Update user to premium
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'PREMIUM',
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
      }
    });

    const newToken = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email, subscriptionStatus: 'PREMIUM' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      success: true, 
      message: 'Payment successful. User is now premium.',
      token: newToken,
      user: { id: updatedUser.id, email: updatedUser.email, subscriptionStatus: 'PREMIUM' }
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

module.exports = router;
