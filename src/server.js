require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ADA backend' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`ADA backend a correr na porta ${PORT}`);
});
