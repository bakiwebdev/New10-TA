// test loan controller
const GetLoans = require('./../controllers/loan.js').getLoans
const GetLoan = require('./../controllers/loan.js').getLoan
const CreateLoan = require('./../controllers/loan.js').createLoan
const UpdateLoan = require('./../controllers/loan.js').updateLoan
const DisburseLoan = require('./../controllers/loan.js').disburseLoan

// test get loan by id
describe('get loan by id', () => {
    it('should return a loan', async () => {
        const loan = await GetLoan('loan-1')
        expect(loan).toMatchObject({
            id: 'loan-1',
            amount: 1000,
            companyID: 'company-1',
            status: 'pending',
        })
    })
})
