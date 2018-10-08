import express from 'express';
import bodyParser from 'body-parser';
import * as orderController from '../controller/ordercontroller';
import * as valid from '../middleware/ValidateInput';
import checkAuth from '../middleware/userAuth';


const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * This function handles all the request routes
 * @param {functions} orderController any number
 * @param {functions} ValidateInput any number
 * @param {functions} userAuth token
 * @returns {object} response from the functions.
 */
router.get('/', checkAuth,orderController.getAllOrder);
router.get('/:id',checkAuth, orderController.getSelectedOrder);
router.post('/', checkAuth,valid.validateOrderInput, orderController.createOrder);
router.put('/:id',checkAuth, valid.validateOrderStatus, orderController.updateOrder);

export default router;
