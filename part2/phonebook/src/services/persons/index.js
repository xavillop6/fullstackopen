import axios from 'axios'

const baseUrl = '/api';

export const create = ({name, number}) => {
    return axios
        .post(baseUrl + '/persons', {name, number})
        .then(response => {
            const { data } = response;
            return data;
        })
}

export const getAll = () => {
    return axios
      .get(baseUrl + '/persons')
      .then(response => {
        const { data } = response;
        return data;
    })
}

export const remove = (person_id) => {
    return axios
        .delete(`${baseUrl}/persons/${person_id}`)
        .then(response => {
            const { data } = response;
            return data;
        })
}
 
export const update = (person) => {
    const person_id = person.id;
    return axios
        .put(`${baseUrl}/persons/${person_id}`, person)
        .then(response => {
            const { data } = response;
            return data;
        })
}