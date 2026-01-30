/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Guest: any = {};

Guest.create = async (data: any) => {
    return axios.post(`${BASE_URL}/guests/create`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default Guest;