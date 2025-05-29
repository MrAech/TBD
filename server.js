const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
    ?false
    :'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}


app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});


//Test API
app.get('/api/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({
        message: 'Bow before me mortal, for i am the great Aech',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Happy is Bad at coding == Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS: ${process.env.NODE_ENV === 'production' ? 'Disabled' : 'Enabled for localhost:3000'}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/test`);
    console.log('=================================');
});
