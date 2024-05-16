const express = require('express');
const bodyParser = require('body-parser');
const db = require('../core/Mysql');

const router = express.Router();

// 解析 application/json
router.use(bodyParser.json());

// 获取运动队的名称
router.get('/teams', (req, res) => {
    db.getTeams((error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// 获取所有的训练计划
router.get('/training-plans', (req, res) => {
    db.getAllTrainingPlans((error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// 添加训练计划
router.post('/training-plans', (req, res) => {
    const { stu_number, athlete_training_plan, training_date, training_field } = req.body;
    db.addTrainingPlan(stu_number, athlete_training_plan, training_date, training_field, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.send('Training plan added successfully.');
    });
});

// 根据学号获取指定的运动员的训练计划
router.get('/athlete_training/:stu_number', (req, res) => {
    const stu_number = req.params.stu_number;
    db.getAthleteDetails(stu_number, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});
//根据学号获取成绩
router.get('/athlete_record/:stu_number', (req, res) => {
    const stu_number = req.params.stu_number;
    db.getAthleteRecord(stu_number, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});
//获取所有的成绩
router.get('/allRecords', (req, res) => {
    db.getAllRecords((error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});
// 获取预约场地信息
router.get('/venueStatus/:venue_name', (req, res) => {
    const venue_name = req.params.venue_name;
    db.getVenueStatus(venue_name, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// 更新预约场地信息
router.put('/updateVenueStatus/:court_id', (req, res) => {
    const court_id = req.params.court_id;
    const status = req.body.status; // 从请求体中获取预约状态
    db.updateVenueStatus(court_id, status, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Venue status updated successfully' });
    });
});

// 将预约数据插入到预约记录表中
router.post('/makeReservation', (req, res) => {
    const { stu_number, court_name, date, time, status } = req.body; // 从请求体中获取预约相关信息
    db.Confirmappointment(stu_number, court_name, date, time, status, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'Reservation made successfully' }); // 如果成功，返回成功消息
    });
});
// 查找预约记录表
router.get('/getReservation/:court_name/:date/:time', (req, res) => {
    const court_name = req.params.court_name;
    const date = req.params.date;
    const time = req.params.time;
    db.findReservation(court_name, date, time, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// 根据场地和日期获取场地状态信息
router.get('/getCourtStatus/:court_name/:date', (req, res) => {
    const court_name =req.params.court_name;
    const date = req.params.date;
    db.getCourtStatus(court_name, date, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});


// 当用户取消预约时，将预约记录删除
router.delete('/cancelReservation', (req, res) => {
    const { stu_number, court_name, date, time } = req.body; // 从请求体中获取取消预约相关信息
    db.CancelAppointment(stu_number, court_name, date, time, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'Reservation canceled successfully' }); // 如果成功，返回成功消息
    });
    
});

//根据学号，项目名称，项目成绩，添加指定学生的体测的成绩
router.post('/addStuRecord', (req, res) => {
    const stu_id = req.body.stu_id;
    const test_name = req.body.test_name;
    const grade = req.body.grade;
    db.addstuscore(stu_id, test_name, grade, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'add successfully' }); // 如果成功，返回成功消息
    });
 });

 //根据学号获取学生的体测成绩的信息
router.get('/getStuRecord/:stu_id', (req, res) => {
    const stu_id = req.params.stu_id;
    db.getstuscore(stu_id, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json(results); // 如果成功，返回成功消息
    });
});

//根据学号获取体制测试预约信息
router.get('/getStuAppointment/:stu_id', (req, res) => {
    const stu_id = req.params.stu_id;
    db.getAthleteAppointment(stu_id, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json(results); // 如果成功，返回成功消息
    });
});
//根据学号，项目名称,日期，时间添加学生体测预约信息(状态信息为空)
router.post('/addStuAppointment', (req, res) => {
    const stu_id = req.body.stu_id;
    const test_name = req.body.test_name;
    const date = req.body.date;
    const time = req.body.time;
    db.addAthleteAppointment(stu_id, test_name, date, time, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'add successfully' }); // 如果成功，返回成功消息
    });
 });
//根据学号，项目名称,日期，时间删除学生体测预约信息
router.delete('/delStuAppointment', (req, res) => {
    const stu_id = req.body.stu_id;
    const test_name = req.body.test_name;
    const date = req.body.date;
    const time = req.body.time;
    db.delAthleteAppointment(stu_id, test_name, date, time, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'delete successfully' }); // 如果成功，返回成功消息
    });
});

module.exports = router;
