const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/student/studentAuthController')
const PanelController = require('../controllers/student/studentPanelController')
const {check} = require('express-validator')
const roleMiddleware = require('./../middlewaree/roleMiddleware')
const authStudentMiddleware = require('./../middlewaree/authStudentMiddleware')
const express = require("express");

const urlencodedParser = express.urlencoded({extended: false});

router.post('/login', [
    urlencodedParser,
    authStudentMiddleware,
    check('email', 'Почта не может быть пустой!').notEmpty(),
    check('password', 'Пароль не может быть пустым!').notEmpty(),
], AuthController.student_login)

router.get('/login',
    authStudentMiddleware,
    AuthController.show_login)

router.get('/passwordRestore',
    AuthController.show_restore)

router.get('/panel/:wd', [
    roleMiddleware(['student'])
    ], PanelController.show_panel)

router.get('/payment', [
    roleMiddleware(['student'])
], PanelController.show_payment)

router.get('/history', [
    roleMiddleware(['student'])
], PanelController.show_history)

router.get('/profile', [
    roleMiddleware(['student'])
], PanelController.show_profile)

router.get('/editPassword', [
    roleMiddleware(['student'])
], PanelController.show_editPassword)

router.get('/editEmail', [
    roleMiddleware(['student'])
], PanelController.show_editEmail)

module.exports = router