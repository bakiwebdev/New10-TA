'use strict'

const OVIO = require('./../../utils/ovio')
const LoanDb = require('./../../Data/Loan')

const OFFERED = 'OFFERED'

// create a loan
module.exports = async data => {
    try {
        // read data from body
        const { amount, companyID } = JSON.parse(data)
        let company = await OVIO(companyID).then(company => {
            return company
        })
        if (company == 'Company not found') {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: `Company not found with id : ${companyID}`,
                }),
            }
        }
        // is company exists
        if (!company) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Company is not found',
                }),
            }
        }
        // check if the company is active
        if (company.isActive) {
            return await new Promise((resolve, reject) => {
                LoanDb.create({ amount, status: OFFERED, company }, (err, loan) => {
                    err && reject(err)

                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(loan),
                    })
                })
            })
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Company is not active',
                }),
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e,
        }
    }
}
