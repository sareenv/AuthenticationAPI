'use strict'

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const User = require('../Model/User')

const twoFactorAuth = require('../Middlewares/securityTwoFactor')
const verifyToken = require('../Middlewares/verifyjwt')

const router = new Router()

router.get('/requestTwoFactorAuth', twoFactorAuth, ctx => {
	ctx.body = {message: 'Email has been sent to the client'}
})


router.post('/verifyTwoFactorAuth', twoFactorAuth ,(ctx)=> {
	ctx.body = {message: 'Client is now verified'}
})

router.post('/signoutAllDevices', bodyParser(), verifyToken, async ctx => {
	const currentUser = ctx.request.userId
	try{
		await currentUser.logoutAllAccounts()
		ctx.body = 'Logged your account'
	} catch(error) {
		ctx.throw(400, 'Error while logout user')
	}
	
})

module.exports = router
