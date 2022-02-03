'use strict'

const dynamo = require('dynamodb')

dynamo.AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
})
// crete dynamo table
module.exports = () =>
    dynamo.createTables(err => {
        if (err) {
            return `Error creating tables: ${err}`
        }
    })
