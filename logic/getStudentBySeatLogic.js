const appRoot = require('app-root-path');
require('dotenv').config();
const path = require('path');
const dbQuery = require(path.join(appRoot.path,"/helpers/dbQuery.json"));
const dbrequest = require(path.join(appRoot.path,"/utils/dbrequest"));
const format = require('pg-format');

const getStudentBySeatLogic = (seat_number) => {         
    return new Promise(async (resolve, reject) => {
        try {    
                let formattedquery = format(dbQuery.getStudentBySeat, seat_number);
                let result = await dbrequest(formattedquery).catch(err => reject(err));
                
                if(result.length){
                    resolve(result);
                } else {
                    reject(404);
                }                                   
                     
            } catch (err) {
                reject(err.message)
            }
    })
}

module.exports = getStudentBySeatLogic;