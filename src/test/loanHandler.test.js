'use strict'

const create_loan = require('./../app1/functions/create-loan.js')
const get_loans = require('./../app1/functions/get-loan-many.js')

describe('Get all loans', () => {
    test('should get all loans', async () => {
        const response = await get_loans()
        console.log(response);
        expect(response.statusCode).toBe(200)
    })
})

// describe('Create Loan', () => {
//     test('should create loan', async () => {
//         const event = {
//             body: JSON.stringify({
//                 amount: '3000',
//                 companyID: 'rechtspersoon-52921506-stichting-uitvaart-al-iman',
//             }),
//         }
//         const response = await create_loan(event.body)
//         console.log(response);
//         expect(response.statusCode).toBe(200)
//     })
// })
