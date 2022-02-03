'use strict'

const LoanDb = require('./../../Data/db')

// get all loans
module.exports = async () => {
    try {
        let loans = await new Promise((resolve, reject) => {
            LoanDb.scan()
                .loadAll()
                .exec((err, loans) => {
                    return err ? reject(err) : resolve(loans.Items)
                })
        })

        return {
            statusCode: 200,
            body: JSON.stringify(loans),
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}
