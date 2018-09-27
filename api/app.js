import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/usersRoutes';
import menuRoutes from './routes/menuRoutes';

const app = express();


app.use('/api/v1/orders', orderRoutes);
app.use('/auth/', userRoutes);
app.use('/menu/', menuRoutes);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  const error = 'Welcome to mobile Buka, the required resource not found';
  res.status(404).send({
    error: {
      message: error,
    },
  })
  next();
});
export default app;
