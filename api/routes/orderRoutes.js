import express from 'express';
import * as orderController from '../controller/ordercontroller';


const router = express.Router();
router.use(express.json());

/**
 * This function handles all the request routes
 * @param {functions} orderController any number
 * @returns {object} response from the functions.
 */
router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getSelectedOrder);
router.post('/', orderController.createOrder);
router.post('/:id', orderController.createOrderItems);
router.put('/:id', orderController.AcceptOrder);
router.put('/complete/:id', orderController.CompleteOrder);

export default router;
