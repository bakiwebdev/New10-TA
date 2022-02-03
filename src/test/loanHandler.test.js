'use strict'

const create_loan = require('./../app1/functions/create-loan.js')
const get_loans = require('./../app1/functions/get-loan-many.js')
const get_loan = require('./../app1/functions/get-loan-many.js')
const update_loan = require('./../app1/functions/update-loan.js')

describe('Get loan', () => {
    test('Should return status code 200', async () => {
        const response = await get_loans()
        expect(response.statusCode).toBe(200)
    })
    test('Should return loans', async () => {
        const response = await get_loans()
        expect(typeof response.body).toBe('object')
    })

    test('Should return loan with a given id ', async () => {
        // get the first loan
        const loans = await get_loans()
        const loanId = loans.body[0].id
        const response = await get_loan(loanId)
        expect(response.statusCode).toBe(200)
    })
    test('Should return null with wrong id', async () => {
        const wrongId = '5e9f8f8f-f9c9-4f7b-b8e8-f8f8f8f8f8f8' // sample loan id
        const response = await get_loan(wrongId)
        expect(response).toBe(null)
    })
})

describe('Create Loan', () => {
    test('Should return status code 200', async () => {
        const response = await create_loan()
        expect(response.statusCode).toBe(200)
    })

    test('Should return the created loan data', async () => {
        const event = {
            body: JSON.stringify({
                amount: '3000',
                companyID: 'rechtspersoon-52921506-stichting-uitvaart-al-iman', // sample company id
            }),
        }
        const response = await create_loan(event.body)
        expect(response.body).toHaveProperty('id')
    })
    test('Should return status code 500 when sending request with out amount', async () => {
        const event = {
            body: JSON.stringify({
                companyID: 'rechtspersoon-52921506-stichting-uitvaart-al-iman', // sample company id
            }),
        }
        const response = await create_loan(event.body)
        expect(response.statusCode).toBe(500)
    })
})

describe('Update Loan', () => {
    test('Should return status code 200', async () => {
        const response = await update_loan()
        expect(response.statusCode).toBe(200)
    })

    test('Should return the updated loan data', async () => {
        const event = {
            body: JSON.stringify({
                amount: '3000',
                companyID: 'rechtspersoon-52921506-stichting-uitvaart-al-iman', // sample company id
            }),
        }
        const response = await update_loan(event.body)
        expect(response.body).toHaveProperty('id')
    })
})
