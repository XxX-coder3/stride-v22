const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express(); // <--- This defines "app" so the error goes away!

app.use(express.json());
app.use(express.static('public'));

// 1. PAYSTACK WEBHOOK (The Listener)
app.post('/paystack-webhook', async (req, res) => {
    const secret = process.env.PAYSTACK_SECRET;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    
    if (hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        if (event.event === 'charge.success') {
            console.log("💰 Payment Verified for:", event.data.customer.email);
            // Internal BNPL logic would go here
        }
    }
    res.sendStatus(200);
});

// 2. BRIDGECARD CARD CREATION (The Action)
app.post('/create-card', async (req, res) => {
    try {
        const response = await axios.post('https://api.bridgecard.co/v1/issuing/sandbox/cards/virtual', {
            cardholder_id: req.body.cardholder_id,
            card_type: "visa",
            currency: "USD"
        }, {
            headers: { 'Authorization': `Bearer ${process.env.BRIDGECARD_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Bridgecard Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Card Creation Failed" });
    }
});

// 3. START SERVER (The Foundation)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Stride Engine Live on Port ${PORT}`);
});
