// routes and endpoints
import express from 'express';
import bodyParser from 'body-parser';


import * as usersController from '../controller/usersController';
import * as valid from '../middleware/ValidateInput';


const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * This function handles all the request routes
 * @param {functions} usersController any number
 * @param {functions} ValidateUsersInput any number
 * @returns {object} response from the functions.
 */
router.post('/signup', valid.ValidateUsersInput, usersController.signup);
router.post('/login', valid.ValidateUserLogin, usersController.login);


export default router;
