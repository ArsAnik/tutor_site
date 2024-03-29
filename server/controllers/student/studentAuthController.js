const db = require('../../utils/db')
const calc_days = require('../../utils/dateCalculation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { JWTKEY } = require('../../config')

const generateAccessToken = (id, role) =>{
    const  payload = {id, role};
    return jwt.sign(payload, JWTKEY, {expiresIn: "24h"});
}
class StudentAuthController {

    async show_login(req, res){
        try {
            res.render("student/enter", {
                title: 'Вход в личный кабинет ученика'
            });
        }
        catch (e)
        {
            console.log(e);
            return res.redirect('/error/Ошибка загрузки!');
        }
    }

    async show_restore(req, res){
        try {
            res.render("student/edit_password", {
                title: 'Восстановление пароля',
                prevPage: "/student/login"
            });
        }
        catch (e)
        {
            console.log(e);
            return res.redirect('/error/Ошибка загрузки!');
        }
    }
    async student_login(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.json({ is_error: true, error: 'Ошибка входа! ' + errors.array()[0].msg });
            }
            const {email, password} = req.body;
            const sql_login = `SELECT * FROM student WHERE email=?`;
            db.query(sql_login, email, function(err, results) {
                if(err) {
                    console.log(err);
                    return res.json({ is_error: true, error: 'Ошибка базы данных!' });
                }
                else if(results.length === 0) {
                    return res.json({ is_error: true, error: `Почта ${email} не зарегистрирована!` });
                }
                // const isValidPassword = bcrypt.compareSync(password, results[0].password);
                // if(!isValidPassword){
                //     return res.json({ is_error: true, error: `Пароль неверен!` });
                // }
                const token = generateAccessToken(results[0].id, "student");
                res.cookie('token', token, { httpOnly: true });
                return res.json({ is_error: false, redirect: '/student/panel/currentWeek'});
            })
        }
        catch (e)
        {
            return res.redirect('/error/Ошибка загрузки!');
        }
    }
}

module.exports = new StudentAuthController()