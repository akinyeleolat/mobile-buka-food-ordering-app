import express from 'express';
import * as orderController from '../controller/ordercontroller';
import * as valid from '../middleware/ValidateInput';
import checkAuth from '../middleware/userAuth';


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
router.post('/', checkAuth,valid.validateOrderInput, orderController.createOrder);
router.put('/:id',checkAuth, valid.validateOrderStatus, orderController.updateOrder);

export default router;
