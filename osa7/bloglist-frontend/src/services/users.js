import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const findById = async (id) => {
    const result = await axios.get(`${baseUrl}/${id}`)
    return result.data
}

export default { getAll, findById }