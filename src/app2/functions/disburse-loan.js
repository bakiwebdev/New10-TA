'use strict'

const LoanDb = require('./../../Data/db')
const DISBURSED = 'DISBURSED'

// disburse a loan
module.exports = async event => {
    try {
        const loanId = event.pathParameters.id
        return await new Promise((resolve, reject) => {
            LoanDb.update(
                {
                    id: loanId,
                    amount: 0,
                    status: DISBURSED,
                },
                function(err, loan) {
                    err && reject(err)

                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(loan),
                    })
                }
            )
        })
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}
