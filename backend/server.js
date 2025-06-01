require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Bow before me mortal, for it is I the great Aech' });
});

app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Server is running on port ${PORT}`);
    console.log('Yeahhhh, we are live! 🎉');
    console.log('=================================');
})