const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const login_interceptor = require('../controller/login_interceptor')

const exceptionHandler = require('../controller/handle_exceptions')
const menuController = require('../controller/menu_controller')

// application/x-www-form-urlencoded for post from forms
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.static('static'));
router.use(express.static('upload_images'));

/** menu router based on index_router */

// show menu page
router.get('/:van_name', menuController.show_page);

// place a new order based on menu page, store order info in a cookie
// if not login, ask login first before post operation.
router.post('/', login_interceptor.customer_login_interceptor, menuController.add_new_order);

// handle 404
router.all('*', exceptionHandler.handle404)


module.exports = router;