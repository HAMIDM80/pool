# USBC Gold Backend

**Backend API server for USBC Gold Staking Platform**

## Setup

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 3. Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health status

### Configuration
- **GET** `/api/config` - Application configuration

### Transaction Info
- **GET** `/api/transactions/:signature` - Get transaction explorer link
- **POST** `/api/webhook/transaction` - Webhook for transaction events

## Deployment on Render.com

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/usbc-gold.git
   git push -u origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Select `backend` directory as Root Directory
   - Build command: `npm install`
   - Start command: `npm start`
   - Set environment variables from `.env`

3. **Set Environment Variables**
   - PORT: 3000
   - NODE_ENV: production
   - Other variables from `.env`

## Frontend Integration

The frontend connects to this backend for:
- Configuration data
- Webhook notifications
- Transaction tracking

## Project Structure

```
backend/
├── server.js           # Main Express server
├── package.json        # Dependencies
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
└── README.md          # This file
```

## Technologies

- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin support
- **Dotenv** - Environment management

## Support

For issues or questions, please refer to the main project documentation.
