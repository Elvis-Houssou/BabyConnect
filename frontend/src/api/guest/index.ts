/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import api from "@/service/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Guest: any = {};

Guest.get = async () => {
    return api.post("/guests/get", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

Guest.create = async (data: any) => {
    return axios.post(`${BASE_URL}/guests/create`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default Guest;