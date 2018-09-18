import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import orderRoutes from './routes/orderRoutes';

const app = express();


app.use('/v1/order', orderRoutes);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  const error = new Error('Welcome to mobile Buka, the required resource not found');
  error.status = 404;
  res.send(error);
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
    },
  });
});
export default app;
