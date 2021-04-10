const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded for post from forms
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(express.static('static'));

// handle 404
router.get('/404', (req, res) => {  // 'default' route to catch user errors

    res.render('404', {title: '404'});
})

module.exports = router;