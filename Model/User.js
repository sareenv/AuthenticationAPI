const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Userschema = mongoose.Schema({
	username: {
		type: String,
		required: true
    }, 
    
	password: {
		type: String,
		required: true
	},
	
	// Salt value before saving to the database.
	passwordSalt: {
		type: String
	},

	firstName: {
		type: String,
	}, 

	lastName: {
		type: String
	},

	profileImageUrl: {
		type: String
	},

	email: {
		type: String,
		required: true
		// validate email.
	},

	about: {
		type: String
	}, 

	countryId: {
		type: String
	}, 

	birthDate: {
		type: Date,
		min: '1999-20-04',
		max: Date.now()
	},

	dateRegistered: {
		type: Date,
	},

	Active: {
		type: Boolean,
		default: false
	},

	deleted: {
		type: Boolean, 
	}

})

/* 
	Middleware: Before saving the data. 
	Hash the data before saving to the database. 
	Ref: https://mongoosejs.com/docs/middleware.html#pre
*/


Userschema.pre('save', async function(){
	// hash the password using bcrypt before saving to the database.
	const unencryptedPassword = this.password
	const encryptedPassword = await bcrypt.hash(unencryptedPassword, 10)
	this.password = encryptedPassword
	this.dateRegistered = Date.now()
})

const User = mongoose.model('User', Userschema);

module.exports = User
