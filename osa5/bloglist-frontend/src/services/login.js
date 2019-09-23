import axios from 'axios'

const url = '/api/login'

const login = async (creds) => {
    const result = await axios.post(url, creds)
    return result.data
}

export default {
    login
}