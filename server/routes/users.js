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
			name: req.body.name
		}
	),
		req.body.password, (err, user) => {
			if(err){
				return res.status(500).json({err:err});
			}

			passport.authenticate('local')(req, res, () => {
				if(!req.files.profilePic){
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
				token: token
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

module.exports = router;
