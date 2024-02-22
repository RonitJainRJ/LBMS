const appRoot = require('app-root-path');
const path = require('path');
const { failureResponse, successResponse } = require(path.join(appRoot.path,'/utils/responseSchema'));
const statusCodes = require(path.join(appRoot.path,'/utils/statusCodes.json'));
const updateStudentLogic = require("../logic/updateStudentLogic");


const updateStudentController = async (req, res) => {
    try {
        let { name, seat_number, paid_upto, student_shift} = await req.body;
        student_shift =  student_shift.toLowerCase();

        console.log(name, seat_number, paid_upto, student_shift );
        
        let result = await updateStudentLogic(name, seat_number, paid_upto, student_shift).catch(error => {
            let failure = failureResponse(statusCodes.NOT_FOUND.status, "Student Not Found", statusCodes.NOT_FOUND.statusCode)
            res.status(failure.statusCode).send(failure.body)         
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
module.exports = updateStudentController