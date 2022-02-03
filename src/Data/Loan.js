'use strict'

const createTable = require('./db')
const dynamo = require('dynamodb')
const Joi = require('joi')
const OFFERED = 'OFFERED'
const DISBURSED = 'DISBURSED'

const Loan = dynamo.define('Loan', {
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

createTable()
module.exports = Loan
