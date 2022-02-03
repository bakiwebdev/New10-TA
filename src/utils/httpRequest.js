// import axios from "axios";
const axios = require('axios')
require('dotenv').config()

// axios instance
const local = axios.create({
    baseURL: 'http://localhost:3000', // localhost or actual url
})

module.exports.putRequest = async (url, body) => {
    try {
        const response = await local.put(url, body)
        return response.data
    } catch (err) {
        return err
    }
}
