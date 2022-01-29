const { getLoan, getLoans, createLoan, updateLoan } = require('./functions')

// // instantiate loan
// const companyId = 'rechtspersoon-52921506-stichting-uitvaart-al-iman'
// const loan = OVIO(companyId).then(company => {
//     return company
// })

describe('Test GET Loans ', () => {
    // check the datatype of the returned value
    it('should return object as a response', async () => {
        const loans = await getLoans()
        expect(typeof loans).toBe('object')
    })
    // check the response status
    it('should return 200 as a status code', async () => {
        const loans = await getLoans()
        console.log('From 200 test case', loans)
        expect(loans.statusCode).toBe(200)
    })
})

// describe('Test GET Loan by id gateway ', () => {
//     it('should return object as a response', async () => {
//         const loan = await getLoan(companyId)
//         expect(typeof loan).toBe('object')
//     })
// })
