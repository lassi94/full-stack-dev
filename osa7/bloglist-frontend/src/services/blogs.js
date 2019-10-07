import axios from 'axios'

const baseUrl = '/api/blogs'

let jwt = null

const setJWT = (newJWT) => {
    console.log("JWT", newJWT)
    jwt = `bearer ${newJWT}`
}


const getAll = () => {
    const config = {
        headers: { Authorization: jwt }
    }
    console.log(config)
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getBlogs = async (id) => {
    const config = {
        headers: { Authorization: jwt }
    }
    const request = await axios.get(`${baseUrl}/user/${id}`, config)
    return request.data
}

const postBlog = async (obj) => {

    const config = {
        headers: {
            Authorization: jwt
        }
    }

    try{

        const result = await axios.post(baseUrl, obj, config)
        return result.data

    }catch(error){
        return error
    }
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: jwt }
    }
    try{
        const result = await axios.delete(`${baseUrl}/${id}`, config)
        return result.data
    }catch(error){
        console.log(error)
    }

}

const likeBlog = async (id, obj) => {
    const config = {
        headers: {
            Authorization: jwt
        }
    }

    try{
        const result = await axios.put(`${baseUrl}/${id}`, obj, config)
        return result.data
    }catch(error){
        console.log(error)
    }
}

const postComment = async (id, obj) => {
    const config = {
        headers: { Authorization: jwt }
    }

    try{
        const result = await axios.put(`${baseUrl}/${id}/comments`, obj, config)
        return result.data

    }catch(error){
        console.log(error)
    }
}

export default { getAll, setJWT, getBlogs, postBlog, deleteBlog, likeBlog, postComment }