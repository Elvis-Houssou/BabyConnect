/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/service/api";

const Guest: any = {};

Guest.get = async () => {
    return api.post("/guests/get", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

Guest.create = async (data: any) => {
    return api.post('/guests/create', data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default Guest;