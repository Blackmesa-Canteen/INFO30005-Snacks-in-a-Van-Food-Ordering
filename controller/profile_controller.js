const md5_util = require('../utils/MD5_utils')

let show_profile_page = async (req, res) => {
    try {

        let user_id = req.session.user;
        // select user model
        let customer_model = require('../model/customer')
        let customer = await customer_model.findOne(
            {'login_id': user_id},
            '_id firstname lastname username avatar_path').lean();

        // show profile page
        res.render('./customer/customer_profile', {
            title: 'Profile',
            username: customer['username'],
            firstname: customer['firstname'],
            lastname: customer['lastname'],
            avatar_path: customer['avatar_path']
        });

    } catch (e) {
        console.log('profile page: ' + e);
        res.redirect('/500')
    }
}

let show_edit_profile_page = async (req, res) => {
    try {

        let user_id = req.session.user;
        // select user model
        let customer_model = require('../model/customer')
        let customer = await customer_model.findOne(
            {'login_id': user_id},
            '_id firstname lastname username').lean();

        // show profile page
        res.render('./customer/customer_edit_profile', {
            title: 'Profile',
            username: customer['username'],
            firstname: customer['firstname'],
            lastname: customer['lastname'],
        });

    } catch (e) {
        console.log('profile page: ' + e);
        res.redirect('/500')
    }
}

let show_edit_password_page = async (req, res) => {
    try {
        // show profile page
        res.render('./customer/edit_password', {
            title: 'Edit password'
        });

    } catch (e) {
        console.log('profile page: ' + e);
        res.redirect('/500')
    }

}

let edit_profile = async (req, res) => {
    try {
        let user_id = req.session.user;
        // select user model
        let customer_model = require('../model/customer')

        // get form information:
        let form_elements = req.body;
        let new_firstname = form_elements.firstname;
        let new_lastname = form_elements.lastname;
        let new_username = form_elements.username;

        await customer_model.findOneAndUpdate(
            {'login_id': user_id},
            {
                'firstname': new_firstname,
                'lastname': new_lastname,
                'username': new_username
            }
        )
        // return back to profile page
        res.redirect('/customer/profile');

    } catch (e) {
        console.log('profile page: ' + e);
        res.redirect('/500')
    }
}

let edit_password = async (req, res) => {

    try {
        let user_id = req.session.user;
        // select user model
        let customer_model = require('../model/customer')

        // get form information:
        let form_elements = req.body;
        let new_password = md5_util.encrypt(form_elements.new_password)
        let old_password = md5_util.encrypt(form_elements.old_password)

        let customer = await customer_model.findOne(
            {'login_id': user_id},
            '_id password').lean();

        if (customer['password'] === old_password) {
            // update password
            await customer_model.findOneAndUpdate(
                {'login_id': user_id},
                {'password': new_password}
            )
            // show success page
            res.render('./customer/profile_edit_success', {
                title: 'Success',
            });

        } else {
            // show fail page
            res.render('./customer/profile_edit_failed', {
                title: 'Failed',
            });
        }

    } catch (e) {
        console.log('profile page: ' + e);
        res.redirect('/500')
    }
}

module.exports = {
    show_profile_page,
    show_edit_profile_page,
    show_edit_password_page,
    edit_password,
    edit_profile
}