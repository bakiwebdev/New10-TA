// import axios from "axios";
const axios = require('axios')
require('dotenv').config()

// axios instance
const companyInstance = axios.create({
    baseURL: 'https://api.overheid.io/openkvk/',
    timeout: 1000,
    headers: {
        'ovio-api-key': process.env.OVIO_API_KEY,
    },
})

module.exports = async id => {
    try {
        //is id null
        if (!id) {
            return `id is null`
        }
        const company = await companyInstance
            .get(`${id}`)
            .then(res => {
                return {
                    id: res.data._links.self.href.split('/openkvk/')[1],
                    name: res.data.handelsnaam,
                    description: res.data.omschrijving,
                    street: res.data.straat,
                    place: res.data.plaats,
                    date_creation: res.data.datum_oprichting,
                    zipCode: res.data.postcode,
                    houseNumber: res.data.huisnummer,
                    isActive: res.data.actief,
                }
            })
            .catch(() => {
                return 'Company not found'
            })
        return await company
    } catch (e) {
        return `error from catch in ovio.js: ${e}`
    }
}
