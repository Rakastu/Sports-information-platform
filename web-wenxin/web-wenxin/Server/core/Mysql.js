const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'supply',
    database: 'Training_management'
});

// 获取运动队的名称
function getTeams(callback) {
    pool.query('SELECT team_name FROM Team', callback);
}

// 获取所有的训练计划
function getAllTrainingPlans(callback) {
    pool.query('SELECT * FROM Training_Plan', callback);
}

// 添加训练计划
function addTrainingPlan(stu_number, athlete_training_plan, training_date, training_field, callback) {
    pool.query('INSERT INTO Training_Plan (stu_number, athlete_training_plan, training_date, training_field) VALUES (?, ?, ?, ?)', 
        [stu_number, athlete_training_plan, training_date, training_field],
        (error, results) => {
            if (error) {
                callback(error); 
            } else {
                callback(null, results); 
            }
        }
    );
}
// 根据学号获取指定的运动员的训练计划
function getAthleteDetails(stu_number, callback) {
    pool.query('SELECT * FROM Training_Plan WHERE stu_number = ?', [stu_number], (error, trainingResults) => {
        if (error) return callback(error);
        callback(null, trainingResults); 
    });
}
//根据学号获取成绩
// 根据学号获取指定的运动员的训练计划
function getAthleteRecord(stu_number, callback) {
    pool.query('SELECT * FROM record WHERE stu_number = ?', [stu_number], (error, competition,grade) => {
        if (error) return callback(error);
        callback(null, competition,grade); 
    });
}
//获取所有的成绩
function getAllRecords(callback) {
    pool.query('SELECT * FROM record', callback);
}
// 获取预约指定场地的所有信息
function getVenueStatus(venue_name, callback) {
    pool.query('SELECT * FROM venues WHERE name = ?', [venue_name], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
}


// 更新预约场地信息
function updateVenueStatus(court_id, status, callback) {
    pool.query('UPDATE venues SET status = ? WHERE id = ?', [status, court_id], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
}

//将预约数据插入到预约记录表中
function Confirmappointment(stu_number, court_name, date, time, status,callback){
    pool.query('INSERT INTO reservations (stu_number, court_name, time, date, status) VALUES (?, ?, ?, ?, ?)', 
    [stu_number, court_name, time, date, status],
    (error, results) => {
        if (error) {
            callback(error); 
        } else {
            callback(null, results); 
        }
    }
);
}
// 根据场地名称和日期时间查找预约记录表中的记录
function findReservation(court_name, date, time, callback) {
    pool.query('SELECT * FROM reservations WHERE court_name = ? AND date = ? AND time = ?', [court_name, date, time], (error, results) => {
        if (error) {
            callback(error); 
        } else {
            callback(null, results); 
        }
    });
}
// 根据场地日期获取当天的场地预约状态
function getCourtStatus(court_name, date, callback) {
    pool.query('SELECT * FROM reservations WHERE court_name =? AND  date = ? ', [court_name,date], (error, results) => {
        if (error) {
            callback(error); 
        } else {
            callback(null, results); 
        }
    });
}

//当用户取消预约时，将预约记录删除
function CancelAppointment(stu_number, court_name, date, time, callback) {
    pool.query('DELETE FROM reservations WHERE stu_number = ? AND court_name = ? AND date = ? AND time = ?', 
        [stu_number, court_name, date, time],
        (error, results) => {
            if (error) {
                callback(error); 
            } else {
                callback(null, results); 
            }
        }
    );
}

//根据学号获取学生的体测的信息
function getstuAlllscores(stu_id, callback) {
    pool.query('SELECT * FROM studentfitness WHERE stu_id = ?', [stu_id], (error, results) => {
        if (error) return callback(error);
        callback(null, results); 
    });
}
//根据学号，项目名称，项目成绩，添加体测预的成绩
function addstuscore(stu_id, test_name, grade, callback) {
    pool.query('INSERT INTO studentfitness stu_id, test_name, grade) VALUES (?, ?, ?)', [stu_id, test_name, grade], (error, results) => {
        if (error) return callback(error);
        callback(null, results); 
    });
}

//根据学号获取体制测试预约信息
function getstuentfitnessappointment(stu_id, callback) {
    pool.query('SELECT * FROM astuentfitnessappointment WHERE stu_id = ?', [stu_id], (error, results) => {
        if (error) return callback(error);
        callback(null, results); 
    });
}
//根据学号，项目名称,日期，时间添加学生体测预约信息(状态信息为空)
function addstuentfitnessappointment(stu_id, test_name, date, time, callback) {
    pool.query('INSERT INTO astuentfitnessappointment stu_id, test_name, date, time) VALUES (?, ?, ?, ?)', [stu_id, test_name, date, time], (error, results) => {
        if (error) return callback(error);
        callback(null, results); 
    });
}
//根据学号，项目名称,日期，时间删除学生体测预约信息
function delstuentfitnessappointment(stu_id, test_name, date, time, callback) {
    pool.query('DELETE FROM astuentfitnessappointment WHERE stu_id = ? AND test_name = ? AND date = ? AND time = ?', [stu_id, test_name, date, time], (error, results) => {
        if (error) return callback(error);
        callback(null, results); 
    });
}

//导出相关的方法
module.exports = {
    getTeams,
    getAllTrainingPlans,
    addTrainingPlan,
    getAthleteDetails,
    getAthleteRecord,
    getAllRecords,
    getVenueStatus,
    updateVenueStatus,
    Confirmappointment,
    CancelAppointment,
    findReservation,
    getCourtStatus,
    getstuAlllscores,
    addstuscore,
    getstuentfitnessappointment,
    addstuentfitnessappointment,
    delstuentfitnessappointment
};
