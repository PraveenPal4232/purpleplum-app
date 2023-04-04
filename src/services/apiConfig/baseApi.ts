import axios from 'axios'

const APIKit = axios.create({
    baseURL: "https://dummyjson.com/",
})

export default APIKit