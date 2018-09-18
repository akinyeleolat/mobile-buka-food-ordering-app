import express from 'express';
import * as orderController from '../controller/ordercontroller';
import * as valid from '../middleware/ValidateInput';


const router = express.Router();
router.use(express.json());

/**
 * This function handles all the request routes
 * @param {functions} orderController any number
 * @param {functions} ValidateInput any number
 * @returns {object} response from the functions.
 */
router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getSelectedOrder);
router.post('/', valid.validateOrderInput, orderController.createOrder);
router.post('/:id', valid.validateItemInput, orderController.createOrderItems);
router.put('/:id', orderController.AcceptOrder);
router.put('/complete/:id', orderController.CompleteOrder);

export default router;
