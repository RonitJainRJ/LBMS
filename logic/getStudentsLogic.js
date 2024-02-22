const appRoot = require('app-root-path');
require('dotenv').config();
const path = require('path');
const dbQuery = require(path.join(appRoot.path,"/helpers/dbQuery.json"));
const dbrequest = require(path.join(appRoot.path,"/utils/dbrequest"));
const format = require('pg-format');

const getStudentsLogic = (category) => {         
    return new Promise(async (resolve, reject) => {
        try {    

                let result;
                if(category==='half'){
                    let formattedquery = format(dbQuery.getHalfDayStudents);
                    result = await dbrequest(formattedquery).catch(err => reject(err));
                    console.log(category);

                } 
                else if(category==='full'){
                    let formattedquery = format(dbQuery.getFullDayStudents);
                    result = await dbrequest(formattedquery).catch(err => reject(err));
                }
                else {
                    let formattedquery = format(dbQuery.getAllStudents, category);
                    result = await dbrequest(formattedquery).catch(err => reject(err));
                } 
                  
                
                resolve(result)                                    
                     
            } catch (err) {
                reject(err.message)
            }
    })
}

module.exports = getStudentsLogic;