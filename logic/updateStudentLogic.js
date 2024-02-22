const appRoot = require('app-root-path');
require('dotenv').config();
const path = require('path');
const dbQuery = require(path.join(appRoot.path,"/helpers/dbQuery.json"));
const dbrequest = require(path.join(appRoot.path,"/utils/dbrequest"));
const format = require('pg-format');

const updateStudentLogic = (name, seat_number, paid_upto, student_shift) => {         
    return new Promise(async (resolve, reject) => {
        try {    
                let formattedquery = format(dbQuery.updateStudent, name, paid_upto, student_shift, seat_number);
                let result = await dbrequest(formattedquery).catch(err => reject(err));

                resolve({
                    "message" : "Student updated successfully"
                })                                 
                     
            } catch (err) {
                reject(err.message)
            }
    })
}

module.exports = updateStudentLogic;