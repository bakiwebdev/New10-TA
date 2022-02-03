'use strict'

const LoanDb = require('./../../Data/db')

// get a loan by id
module.exports = async event => {
    try {
        let id = event.pathParameters.id
        let loan = await new Promise((resolve, reject) => {
            LoanDb.get(id, (err, loan) => {
                return err ? reject(err) : resolve(loan)
            })
        })

        return {
            statusCode: 200,
            body: JSON.stringify(loan),
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}
