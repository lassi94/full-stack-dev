import axios from 'axios'


const url = 'http://localhost:3001/persons'


const getAll = () =>{
    const all = axios.get(url)
    return all.then(response => response.data)
}

const update = (id,obj) =>{
    const up = axios.put(`${url}/${id}`, obj)
    return up.then(response => response.data)

}

const create = (obj) =>{
    const crea = axios.post(url, obj)
    return crea.then(response => response.data)
}

const dele = (id) => {
    const del = axios.delete(`${url}/${id}`)
    return del.then(response => 
        response.status)
}

export default {
    getAll, update, create, dele
}