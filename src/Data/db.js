const dynamo = require('dynamodb')
const Joi = require('joi')
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

module.exports = dynamo.define('Loan', {
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
