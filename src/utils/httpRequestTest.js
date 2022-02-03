// this file only used to test the httpRequest library
const { putRequest } = require('../utils/httpRequest')
const httpBody = {
    amount: 100, // amount
    companyID: 'rechtspersoon-52921506-stichting-uitvaart-al-iman', // sample company id
}
const loanId = '292dff77-d01f-4ebd-9910-a25a05b10eb2' // sample loan id

putRequest(`/disburse/${loanId}`, httpBody).then(res => {
    console.log("Response", res)
})
