const express = require('express');
const routerAccount  = express.Router();
const account_controller = require('../controllers/accountController');
const jwtVerify = require('../utils/jwt')

const baseUrl = "/api/account"

routerAccount.post(baseUrl + '/login', account_controller.login);

routerAccount.post(baseUrl + '/reg', account_controller.reg);

routerAccount.delete(baseUrl + '/delete', jwtVerify, account_controller.delete);

routerAccount.put(baseUrl + '/change', jwtVerify, account_controller.change);

module.exports = routerAccount;