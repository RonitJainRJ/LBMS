const appRoot = require('app-root-path');
require('dotenv').config();
const path = require('path');
const dbQuery = require(path.join(appRoot.path,"/helpers/dbQuery.json"));
const dbrequest = require(path.join(appRoot.path,"/utils/dbrequest"));
const format = require('pg-format');

const addStudentLogic = (name, seat_number, joining_date, paid_upto, student_shift) => {         
    return new Promise(async (resolve, reject) => {
        try {                
                let formattedquery = format(dbQuery.addStudent,  seat_number, name, joining_date, paid_upto, student_shift);
                await dbrequest(formattedquery).catch(err => reject(err));  
                
                resolve({
                    message:"Student added successfully"
                })                                    
                     
            } catch (err) {
                reject(err.message)
            }
    })
}

module.exports = addStudentLogic;