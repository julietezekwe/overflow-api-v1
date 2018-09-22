import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import path from 'path';
import routes from './routes/index';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validator to check requests
app.use(expressValidator());

// Versioning and Routes
app.use('/api/v1/', routes);

// Setup a default catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../clients/index.html'));
});

export default app;