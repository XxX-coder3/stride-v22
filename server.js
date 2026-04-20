app.post('/create-card', async (req, res) => {
    try {
        const response = await axios.post('https://api.bridgecard.co/v1/issuing/sandbox/cards/virtual', {
            cardholder_id: "ID_FROM_KYC",
            card_type: "visa",
            currency: "USD"
        }, {
            headers: { 'Authorization': `Bearer ${process.env.BRIDGECARD_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Card Creation Failed");
    }
});
app.post('/create-card', async (req, res) => {
    try {
        const response = await axios.post('https://api.bridgecard.co/v1/issuing/sandbox/cards/virtual', {
            cardholder_id: "ID_FROM_KYC",
            card_type: "visa",
            currency: "USD"
        }, {
            headers: { 'Authorization': `Bearer ${process.env.BRIDGECARD_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Card Creation Failed");
    }
});
