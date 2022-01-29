// this file only used to test the ovio library
const OVIO = require('../utils/ovio')
const companyID = 'rechtspersoon-52921506-stichting-uitvaart-al-iman'

OVIO(companyID).then(company => {
    console.log("Company Information", company)
})
