'use strict'

const disburse_loan = require('./functions/disburse-loan.js')

// disburse a loan
module.exports.disburseLoan = async event => {
    return await disburse_loan(event.pathParameters.id)
}
