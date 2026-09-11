require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auteurs', require('./routes/auteurs.routes'));

app.get('/', async (req, res) => {
    res.send('Hello Moto')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});