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


// 当用户取消预约时，将预约记录删除
router.delete('/cancelReservation', (req, res) => {
    const { stu_number, court_name, date, time } = req.body; // 从请求体中获取取消预约相关信息
    db.CancelAppointment(stu_number, court_name, date, time, (error, results) => {
        if (error) return res.status(500).json({ error: 'Database error' }); // 如果出现错误，返回500错误响应
        res.json({ message: 'Reservation canceled successfully' }); // 如果成功，返回成功消息
    });
    
});

module.exports = router;
