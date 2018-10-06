import express from 'express';
import * as orderController from '../controller/ordercontroller';



const router = express.Router();
router.use(express.json());

/**
 * This function handles all the request routes
 * @param {functions} orderController any number
 * @returns {object} response from the functions.
 */
router.get('/:id/orders',orderController.getUsersHistory);

export default router;
