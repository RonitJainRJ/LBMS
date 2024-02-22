const appRoot = require('app-root-path');
const path = require('path');
const { failureResponse, successResponse } = require(path.join(appRoot.path,'/utils/responseSchema'));
const statusCodes = require(path.join(appRoot.path,'/utils/statusCodes.json'));
const getStudentBySeatLogic = require("../logic/getStudentBySeatLogic");


const getStudentBySeatController = async (req, res) => {
    try {
        const seat_number = await req.query.seat_number;
        
        let result = await getStudentBySeatLogic(seat_number).catch(error => {
            if(error===404){
                let failure = failureResponse(statusCodes.NOT_FOUND.status, "Student Not Found", statusCodes.NOT_FOUND.statusCode)
                res.status(failure.statusCode).send(failure.body)
            } else{
                let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
                res.status(failure.statusCode).send(failure.body)
            }            
        })
        if (result) {
            let success = successResponse(result, statusCodes.OK.statusCode)
            res.status(success.statusCode).send(success.body)
        }

    } catch (error) {
        console.log(error)
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}
module.exports = getStudentBySeatController