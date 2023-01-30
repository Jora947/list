import axios from "axios"


export const getAllPeople = async () => {
    const response = await axios.get(`https://63d6512be60d574369767c54.mockapi.io/api/v1/people`)
    return response
}

export const postUser = async (name, queue_number, date_of_issue) => {
    const data = {name: name, queue_number: queue_number, date_of_issue:date_of_issue}
    const response = await axios.post(`https://63d6512be60d574369767c54.mockapi.io/api/v1/people`,data)
    return response
}

export const putUser = async (id,new_queue_number,date_of_issue) => {
    const data = {queue_number:new_queue_number, date_of_issue:date_of_issue}
    const response = await axios.put(`https://63d6512be60d574369767c54.mockapi.io/api/v1/people/${id}`, data)
    return response
}
