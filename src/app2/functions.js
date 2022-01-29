// import disburseLoan from loan controller
const DisburseLoan = require('./../controllers/loan.js').disburseLoan
// disburse a loan
module.exports.disburseLoan = async event => {
    return DisburseLoan(event.pathParameters.id)
}
