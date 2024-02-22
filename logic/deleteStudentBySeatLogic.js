const appRoot = require('app-root-path');
require('dotenv').config();
const path = require('path');
const dbQuery = require(path.join(appRoot.path,"/helpers/dbQuery.json"));
const dbrequest = require(path.join(appRoot.path,"/utils/dbrequest"));
const format = require('pg-format');

const deleteStudentBySeatLogic = (seat_number) => {         
    return new Promise(async (resolve, reject) => {
        try {    
                let formattedquery = format(dbQuery.deleteStudentBySeat, seat_number);
                await dbrequest(formattedquery).catch(err => reject(err));
                
                resolve({
                    "message" : "Student deleted successfully"
                })                                 
                     
            } catch (err) {
                reject(err.message)
            }
    })
}

module.exports = deleteStudentBySeatLogic;