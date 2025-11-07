const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const SOLANA_RPC = process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';

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
        tokenMint: 'ArNAtLrRe9iA2ysxet7EGW62ffTQEXiyHLtfGtXjCKtb',
        aprRate: 27,
        minDuration: 5,
        maxDuration: 770,
        network: 'mainnet-beta',
        rpcUrl: process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com'
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

app.post('/api/rpc', async (req, res) => {
    try {
        const response = await fetch(SOLANA_RPC, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('RPC proxy error:', error);
        res.status(500).json({
            error: 'RPC proxy failed',
            message: error.message
        });
    }
});

app.get('/api/transactions/:signature', (req, res) => {
    const { signature } = req.params;
    
    res.json({
        signature,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`,
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
