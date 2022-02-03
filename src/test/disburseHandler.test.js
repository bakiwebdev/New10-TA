'use strict'

const disburse_loan = require('./../app2/functions/disburse-loan.js')

describe('Disburse Loan', () => {
    test('Should return status code 200', async () => {
        const loanId = '5e9f8f8f-f9c9-4f7b-b8e8-f8f8f8f8f8f8' // sample loan id
        const response = await disburse_loan(loanId)
        expect(response.statusCode).toBe(200)
    })

    test('Should return the disbursed loan data', async () => {
        const loanId = '5e9f8f8f-f9c9-4f7b-b8e8-f8f8f8f8f8f8' // sample loan id
        const response = await disburse_loan(loanId)
        expect(response.body).toHaveProperty('id')
    })

    test('Should return status code 400', async () => {
        const loanId = '5e9f8f8f-f9c9-4f7b-b8e8-f8f8f8f8f8f8' // sample loan id
        const response = await disburse_loan(loanId)
        expect(response.statusCode).toBe(400)
    })
})
