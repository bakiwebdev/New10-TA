'use strict'

const create_loan = require('./functions/create-loan.js')
const get_loans = require('./functions/get-loan-many.js')
const get_loan = require('./functions/get-loan.js')
const update_loan = require('./functions/update-loan.js')

// get loan by id
module.exports.getLoan = async event => {
    return await get_loan(event)
}
// get all loans
module.exports.getLoans = async () => {
    return await get_loans()
}
// create a loan
module.exports.createLoan = async event => {
    return await create_loan(event.body)
}

// update a loan
module.exports.updateLoan = async event => {
    return await update_loan(event)
}
