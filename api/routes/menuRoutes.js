// routes and endpoints
import express from 'express';
import bodyParser from 'body-parser';


import * as menuController from '../controller/menuController';
import * as valid from '../middleware/ValidateInput';


const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * This function handles all the request routes
 * @param {functions} menuController any number
 * @param {functions} ValidateMenuInput any number
 * @returns {object} response from the functions.
 */
router.post('/', valid.ValidateMenuInput, menuController.addFood);
router.get('/', menuController.getMenu);


export default router;
