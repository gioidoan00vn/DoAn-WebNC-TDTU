const express = require('express')
const Router = express.Router()
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Account = require('../models/AccountModel')

const registerValidator = require('./validators/registerValidator')
const loginValidator = require('./validators/loginValidator')

Router.post('/login', loginValidator, (req, res) => {
    let error="";
    let result = validationResult(req)
    if (result.errors.length === 0) {
        let {email, password} = req.body 
        let account = undefined

        Account.findOne({email: email})
        .then(acc => {
            if (!acc) {
                error = 'Email không tồn tại'
                console.log(error)
            }
            account = acc
            return bcrypt.compare(password, acc.password)
        })
        .then(passwordMatch => {
            if (!passwordMatch) {
                error = 'Đăng nhập thất bại, mật khẩu không chính xác'
                console.log(error)
            }
            const {JWT_SECRET} = process.env
            jwt.sign({
                email: account.email,
            },JWT_SECRET, {
                expiresIn: '1h'
            }, (err, token) => {
                res.json({
                    code: 0,
                    message:'Đăng nhập thành công',
                    token: token
                })
               
            })
            if (error!=""){
                return res.render('login',{error:error})
            }
        })
        .catch(e => {
            error =  'Đăng nhập thất bại: ' + e.message
            console.log(error)
        })
    }
    else {
        let messages = result.mapped()
        let message = ''
        for (m in messages) {
            message = messages[m].msg
            break
        }
        error =  message
        return res.render('login',{error:error})
    }
    
})

Router.post('/register', registerValidator, (req, res) => {
    let result = validationResult(req)
    if (result.errors.length === 0) {

        let {email, password, fullname} = req.body
        Account.findOne({email: email})
        .then(acc => {
            if (acc) {
                throw new Error('Tài khoản này đã tồn tại (email)')
            }
        })
        .then(() => bcrypt.hash(password, 10))
        .then(hashed => {

            let user = new Account({
                email: email, 
                password: hashed,
                fullname: fullname,
                role:0
            })
            return user.save();
        })
        .then(() => {
            // không cần trả về chi tiết tài khoản nữa
            return res.json({code: 0, message: 'Đăng ký tài khoản thành công'})
        })
        .catch(e => {
            return res.json({code: 2, message: 'Đăng ký tài khoản thất bại: ' + 
                                e.message})
        })
        
    }
    else {
        let messages = result.mapped()
        let message = ''
        for (m in messages) {
            message = messages[m].msg
            break
        }
        return res.json({code: 1, message: message})
    }
})

module.exports = Router