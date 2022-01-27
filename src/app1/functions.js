let dynamo = require('dynamodb')
let Joi = require('joi')

const OFFERED = 'OFFERED'
const DISBURSED = 'DISBURSED'

dynamo.AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
})

let Loan = dynamo.define('Loan', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        id: dynamo.types.uuid(),
        amount: Joi.number().required(),
        status: Joi.string().valid(OFFERED, DISBURSED),
    },
})

// get all loans
module.exports.getLoans = async () => {
    try {
        let loans = await new Promise((resolve, reject) => {
            Loan.scan()
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

// get a loan by id
module.exports.getLoan = async event => {
    try {
        // get the id from the path parameter
        let loan = await new Promise((resolve, reject) => {
            Loan.get(event.pathParameters, (err, loan) => {
                return err ? reject(err) : resolve(loan)
            })
        })

        return {
            statusCode: 200,
            body: loan ? JSON.stringify(loan) : 'Loan not found',
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Internal Server Error : ' + e.message,
        }
    }
}

// create a loan
module.exports.createLoan = async event => {
    try {
        await new Promise((resolve, reject) => {
            dynamo.createTables(err => (err ? reject(err) : resolve()))
        })

        const { amount } = event.pathParameters
        return await new Promise((resolve, reject) => {
            Loan.create({ amount, status: OFFERED }, function(err, loan) {
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
            body: e.stack,
        }
    }
}
// update a loan
module.exports.updateLoan = async event => {
    try {
        const { id, status } = event.pathParameters
        return await new Promise((resolve, reject) => {
            Loan.update(
                { id, status },
                {
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
            body: e.stack,
        }
    }

    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(event.pathParameters),
    // }
}

// delete a loan
module.exports.deleteLoan = async event => {
    try {
        const { id } = event.pathParameters

        await Loan.destroy(id, function(err, loan) {
            if (err) {
                return {
                    statusCode: 500,
                    body: 'Internal Server Error : ' + err.message,
                }
            }            
            return {
                statusCode: 200,
                body: JSON.stringify(loan),
            }
        })

        return {
            statusCode: 200,
            body: 'Loan deleted',
        }

        // return await new Promise((resolve, reject) => {
        //     Loan.destroy(id, { ReturnValues: 'ALL_OLD' }, function(err, loan) {
        //         if (!err) {
        //             resolve({
        //                 statusCode: 200,
        //                 body: JSON.stringify(loan),
        //             })
        //         } else {
        //             resolve({
        //                 statusCode: 404,
        //                 body: 'Loan not found',
        //             })
        //         }
        //     })
        // })
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}

module.exports.function4 = async () => {
    return {
        statusCode: 501,
        body: 'Not Implemented',
    }
}

module.exports.function6 = async () => {
    // I'll make call the endpoint on app2 to update the loan status
}
