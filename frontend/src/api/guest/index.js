import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

let Guest = {};

Guest.create = async (data) => {
    return axios.post(`${BASE_URL}/guests/create`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default Guest;