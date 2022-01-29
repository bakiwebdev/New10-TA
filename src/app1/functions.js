// import loan from controller
const GetLoans = require('./../controllers/loan.js').getLoans
const GetLoan = require('./../controllers/loan.js').getLoan
const CreateLoan = require('./../controllers/loan.js').createLoan
const UpdateLoan = require('./../controllers/loan.js').updateLoan

// get loan by id
module.exports.getLoan = async event => {
    return await GetLoan(event.pathParameters.id)
}
// get all loans
module.exports.getLoans = async event => {
    return await GetLoans()
}
// create a loan
module.exports.createLoan = async event => {
    return await CreateLoan(event.body)
}

// update a loan
module.exports.updateLoan = async event => {
    return await UpdateLoan(event.pathParameters.id, event.body)
}

