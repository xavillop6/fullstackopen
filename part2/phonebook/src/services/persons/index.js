import axios from 'axios'

export const create = ({name, number}) => {
    return axios
        .post('http://localhost:3001/persons', {name, number})
        .then(response => {
            const { data } = response;
            return data;
        })
}

export const getAll = () => {
    return axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const { data } = response;
        return data;
    })
}

export const remove = (person_id) => {
    return axios
        .delete('http://localhost:3001/persons/'+person_id)
        .then(response => {
            const { data } = response;
            return data;
        })
 }