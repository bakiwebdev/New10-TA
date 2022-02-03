'use strict'

const LoanDb = require('./../../Data/Loan')
const DISBURSED = 'DISBURSED'

// disburse a loan
module.exports = async id => {
    try {
        const loanId = id
        const newData = {
            id: loanId,
            status: DISBURSED,
            amount: 0,
        }
        return await new Promise((resolve, reject) => {
            LoanDb.update(newData, (err, loan) => {
                err && reject(err)

                resolve({
                    statusCode: 200,
                    body: JSON.stringify(loan),
                })
            })
        })
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}
