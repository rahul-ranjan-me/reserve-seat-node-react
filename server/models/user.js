var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: String,
	admin : {
		type: Boolean,
		default: false
	},
	password: String,
	firstName: String,
	lastName: String,
	profilePic: Object,
	birthMonth: String,
	birthDay: Number,
	birthYear: Number,
	gender: String,
	mobile: String,
	email: String,
	location: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);