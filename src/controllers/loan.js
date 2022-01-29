const dynamo = require('dynamodb')
const Joi = require('joi')
const OVIO = require('../utils/ovio')

const OFFERED = 'OFFERED'
const DISBURSED = 'DISBURSED'

dynamo.AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
})
// crete dynamo table
dynamo.createTables(err => {
    if (err) {
        console.log('Error creating tables: ', err)
    }
})

let Loan = dynamo.define('Loan', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        id: dynamo.types.uuid(),
        amount: Joi.number().required(),
        status: Joi.string().valid(OFFERED, DISBURSED),
        company: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string()
                .allow(null)
                .allow('')
                .optional(),
            street: Joi.string().required(),
            place: Joi.string().required(),
            date_creation: Joi.string().required(),
            zipCode: Joi.string().required(),
            houseNumber: Joi.string().required(),
            isActive: Joi.bool().required(),
        },
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
module.exports.getLoan = async id => {
    try {
        let loan = await new Promise((resolve, reject) => {
            Loan.get(id, (err, loan) => {
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

// create a loan
module.exports.createLoan = async data => {
    try {
        // read data from body
        const { amount, companyID } = JSON.parse(data)

        let company = await OVIO(companyID).then(company => {
            return company
        })

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
                Loan.create({ amount, status: OFFERED, company }, function(err, loan) {
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
            body: 'Internal Server Error : ' + e.message,
        }
    }
}

// update a loan
module.exports.updateLoan = async (id, data) => {
    try {
        // loan id
        const loanId = id
        // get loan by loan id
        let loan = await new Promise((resolve, reject) => {
            Loan.get(id, (err, loan) => {
                return err ? reject(err) : resolve(loan)
            })
        })
        // read data from body
        const { amount, companyID } = JSON.parse(data)
        // is loan exist and is loan status is OFFERED
        if (loan && loan.attrs.status === OFFERED) {
            //check if company and amount are valid
            if (amount <= loan.attrs.amount && companyID === loan.attrs.company.id) {
                // redirect to disburse getway
                // not completed
                return {
                    statusCode: 200,
                    body: 'redirect to disburse getway',
                    headers: {
                        // redirect to disburse getway
                        Location: 'https://localhost:3000/disburse/' + loanId,
                    },
                }
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

// disburse a loan
module.exports.disburseLoan = async id => {
    try {
        return await new Promise((resolve, reject) => {
            Loan.update(
                {
                    id: id,
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
