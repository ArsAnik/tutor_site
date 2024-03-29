const db = require('../../utils/db')
const calc_days = require("../../utils/dateCalculation");
class AdminStudentPageController {

    async show_page(req, res){
        try {
            const id = req.params.id;
            const sql_queries = `SELECT * FROM student s
                    LEFT JOIN aim a ON s.FK_aim = a.id
                    LEFT JOIN messenger m ON s.FK_messenger = m.id
                    LEFT JOIN course c ON s.FK_course = c.id
                    WHERE s.id = ?;
                    SELECT * FROM lesson l
                    LEFT JOIN subject s ON l.FK_subject = s.id
                    LEFT JOIN tutor t ON l.FK_tutor = t.id
                    WHERE l.FK_student=? AND l.is_done=1
                    ORDER BY l.date`;
            db.query(sql_queries, [id, id], function(err, results) {
                if(err) {
                    console.log(err);
                    return res.redirect('/error/Ошибка базы данных!');
                }
                results[1].forEach(
                    function (element) {
                        element.feature = element.is_regular ? "нет" : "разовое";
                        element.day = calc_days.get_day(element.date);
                        element.payLink = element.link;
                    }
                );
                return res.render("admin/student_page", {
                    title: "Ученик: " + results[0][0].name,
                    student: results[0][0],
                    payments: results[1],
                    is_neg_balance: results[0][0].balance < 0
                });
            })
        }
        catch (e)
        {
            return res.redirect('/error/Ошибка загрузки!');
        }
    }
}

module.exports = new AdminStudentPageController()