import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();



app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});
app.use('/api', routes);
app.use(errorHandler);
export default app;