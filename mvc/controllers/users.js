var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var User = require('../models/user');

// Dashboard
router.get('/dashboard', function(req, res){
	if(!req.user){
		res.redirect('/');
	}else{
    if(req.user.userType === "systemAdmin"){
      res.render('admin_dashboard', {userTypeAdmin: true, pageActive: "active", pageNoActive: ""});
    }else if(req.user.userType === "storeAdmin"){
            res.render('dashboard', {userTypeAdmin: false});
      }else if(req.user.userType === "storeEmployee"){
              res.render('dashboard', {userTypeAdmin: false});
      }
	}
});

// Register
router.get('/register', function(req, res){
	res.render('register', {layout: 'auth', login: false});
});

// Login
router.get('/login', function(req, res){
	res.render('login', {layout: 'auth', login: true, user: req.user});
});

// Forgot Password
router.get('/forgotpassword', function(req, res){
	res.render('forgotpassword', {layout: 'auth', login: true});
});

router.get('/resetpassword/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Ha expirado este enlace para restaurar su contraseña. Por favor solicite la restauración nuevamente.');
      return res.redirect('/users/forgotpassword');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

router.post('/forgotpassword', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },	
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
		  
        if (!user) {
          req.flash('error', 'No existe esta cuenta. Por favor verificar nuevamente.');
          return res.redirect('/users/forgotpassword');
        }
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'andreslt90',
          pass: 'fdgingenieria2016'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Recuperar Contraseña - FDG Ingeniería Ltda.',
        text: 'Esta recibiendo este correo porque usted, u otra persona, ha solicitado restaurar la contraseña de su cuenta en FDG Ingeniería.\n\n' +
          'Por favor abra el siguiente enlance para completar el proceso:\n\n' +
          'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
          'Si usted no ha solicitado esto, por favor ignore este correo. Su cuenta permanecerá sin cambios.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'Se ha enviado un correo electrónico a ' + user.email + ' con las instrucciones a seguir.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgotpassword');
  });
});


// Register User
router.post('/register', function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var name = req.body.name;
  var lastname = req.body.lastname;
	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{layout: 'auth',
			errors:errors
		});
	} else {
		var newUser = new User({
      username: username,
			email:email,
			password: password,
      name: name,
      lastname: lastname
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Has sido registrado satisfactoriamente. Te llegará un correo de confirmación una vez el administrador autorice tu cuenta');

		res.redirect('/');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'El usuario ingresado no existe. Verifica nuevamente.'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Contraseña inválida. Verifica nuevamente.'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/dashboard', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});

module.exports = router;
