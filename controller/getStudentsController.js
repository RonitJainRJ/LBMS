const appRoot = require('app-root-path');
const path = require('path');
const { failureResponse, successResponse } = require(path.join(appRoot.path,'/utils/responseSchema'));
const statusCodes = require(path.join(appRoot.path,'/utils/statusCodes.json'));
const getStudentsLogic = require("../logic/getStudentsLogic");


const getStudentsController = async (req, res) => {
    try {
        let category = await req.query.category;
        if(category){
            category = category.toLowerCase();
        }
        let result = await getStudentsLogic(category).catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
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
module.exports = getStudentsController