'use strict';

const express = require('express');
const router = express.Router();
const User = require("../models/user").user;
const tickets = require("../models/ticket");
const userType = require('../models/userType');
var moment = require('moment');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.redirect('/dashboard');	
});

// General Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res){
	userType.findOne({ userTitle: "systemAdmin"}, function(err, usert) {
		if (usert._id.toString() == req.user.userType_id)
	    	res.redirect('/admin/dashboard');
	     else
	    	res.redirect('/users/dashboard');
	    });
});

// Admin Dashboard
router.get('/admin/dashboard', ensureAuthenticated, function(req, res){
	 userType.findOne({ userTitle: "systemAdmin"}, function(err, usert) {
	     if (usert._id.toString() == req.user.userType_id){
			User.find({}, function(err, users){
				tickets.find({}, function(err, tkts){
					res.render('admin_tickets', {userTypeAdmin: true, tkts});		
				});
			});
    	 }else
    	     res.render('custom_dashboard', {userTypeAdmin: false});
	    });
});

// Admin Manage Users
router.get('/admin/manage_users', function(req, res){
	if (!req.user)
		res.redirect('/');
	else
		res.render('admin_users', {layout: 'layout', userTypeAdmin: true});
});

// Admin Appointments
router.get('/admin/appointments', function(req, res){
	if (!req.user)
		res.redirect('/');
	else	
		res.render('appointments', {layout: 'layout', userTypeAdmin: true});
});

// Customers->Cities
router.get('/admin/customers/cities', ensureAuthenticated,function(req, res){
	res.render('admin_customers_cities', {layout: 'layout', userTypeAdmin: true});
});

// Customers->Companies
router.get('/admin/customers/companies', ensureAuthenticated,function(req, res){
	res.render('admin_customers_companies', {layout: 'layout', userTypeAdmin: true});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.render('login', {layout: 'auth', login: false});
	}
}


module.exports = router;

/*module.exports = {
	router = require('./routes')();
}*/
