import express from 'express';
import * as orderController from '../controller/ordercontroller';


const router = express.Router();
router.use(express.json());


router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getSelectedOrder);
router.post('/', orderController.createOrder);
router.post('/:id', orderController.createOrderItems);
router.put('/:id', orderController.AcceptOrder);
router.put('/complete/:id', orderController.CompleteOrder);

export default router;
