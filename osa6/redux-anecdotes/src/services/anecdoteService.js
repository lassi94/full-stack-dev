import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const result = await axios.get(url)
    return result.data
}

const create = async (obj) => {
    const result = await axios.post(url, obj)
    return result.data
}

const update = async (id, obj) => {
    const result = await axios.put(`${url}/${id}`, obj)
    return result.data
}

export default { getAll, create, update }