const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'USBC Gold Backend Server',
        status: 'running',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/config', (req, res) => {
    res.json({
        programId: 'HfJt6Du4gBcrQK7xieyzEwYndjWeKppEwCuPDCDY69um',
        tokenMint: 'FMDRmMJJqqxJ5n5q5jueV2RUUmNUe4Kwvgd1Fy6qQ2r3',
        aprRate: 27,
        minDuration: 5,
        maxDuration: 770,
        network: 'devnet'
    });
});

app.post('/api/webhook/transaction', (req, res) => {
    const { signature, type } = req.body;
    
    if (!signature || !type) {
        return res.status(400).json({
            error: 'Missing required fields: signature, type'
        });
    }

    console.log(`Webhook: ${type} transaction - ${signature}`);
    
    res.json({
        success: true,
        message: 'Webhook received',
        signature,
        type,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/transactions/:signature', (req, res) => {
    const { signature } = req.params;
    
    res.json({
        signature,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`✅ USBC Gold Backend running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
