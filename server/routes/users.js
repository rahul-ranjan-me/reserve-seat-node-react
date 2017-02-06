var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var config = require('../config')

router.use(fileUpload());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
	req.body.admin = req.body.admin == 'true' ? true : false;
	
	User.register(new User(
		{
			username: req.body.username, 
			admin: req.body.admin,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			birthMonth: req.body.birthMonth,
			birthDay: req.body.birthDay,
			birthYear: req.body.birthYear,
			gender: req.body.gender,
			mobile: req.body.mobile,
			email: req.body.email,
			location: req.body.location
		}
	),
		req.body.password, (err, user) => {
			if(err){
				return res.status(500).json({err:err});
			}

			passport.authenticate('local')(req, res, () => {
				if(!req.files || !req.files.profilePic){
					return res.status(200).json({status: 'Registration Successful!'});
				}

				var profilePic = req.files.profilePic,
					fileType = profilePic.name.substr(profilePic.name.lastIndexOf('.'), profilePic.name.length);

				profilePic.mv(config.fileUploadURL+req.body.username+fileType, function(err) {
					if (err) {
						res.status(500).send(err);
					}else {
						return res.status(200).json({status: 'Registration Successful!'});
					}
				});
				
			});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err){
			return next(err);
		}

		if(!user){
			return res.status(401).json({
				err:info
			});
		}

		req.logIn(user, (err) => {
			if(err){
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}

			var token = Verify.getToken(user);
			res.status(200).json({
				status: 'Login Successful!',
				success: true,
				token: token,
				id: user._id,
				userDetails: {
					id: user._id,
					admin: user.admin,
					birthday: user.birthday,
					birthMonth: user.birthMonth,
					birthYear: user.birthYear,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					gender: user.gender,
					location: user.location,
					mobile: user.mobile,
					username: user.username
				}
			})
		})
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
});

router.route('/:username')
	.get((req, res, next) => {
		User.findById(req.params.username, (err, user) => {
			if(err) throw err;
			res.json(user);
		});
	});

module.exports = router;
