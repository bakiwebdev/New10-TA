'use strict'

const LoanDb = require('./../../Data/Loan')
const OFFERED = 'OFFERED'
const { putRequest } = require('../../utils/httpRequest')
// update a loan
module.exports = async event => {
    try {
        // loan id
        const loanId = event.pathParameters.id
        // read data from body
        const { amount, companyID } = JSON.parse(event.body)
        // get loan by loan id
        const loan = await new Promise((resolve, reject) => {
            LoanDb.get(loanId, (err, loan) => {
                return err ? reject(err) : resolve(loan)
            })
        })
        // is loan exist and is loan status is OFFERED
        if (loan && loan.attrs.status === OFFERED) {
            //check if company and amount are valid
            if (amount <= loan.attrs.amount && companyID === loan.attrs.company.id) {
                const requestBody = {
                    amount,
                    companyID,
                }
                return await new Promise((resolve, reject) => {
                    putRequest(`/disburse/${loanId}`, requestBody)
                        .then(response => {
                            resolve({
                                statusCode: 200,
                                body: JSON.stringify(response),
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            } else {
                return {
                    statusCode: 400,
                    body: 'Invalid data please send valid data',
                }
            }
        } else {
            return {
                statusCode: 400,
                body: 'Loan not found or status is not OFFERED',
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}
