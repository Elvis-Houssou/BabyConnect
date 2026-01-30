/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/service/api";

const Auth: any = {};

Auth.login = async (data: any) => {
    return api.post('/auth/login', data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

Auth.logout = async (data: any) => {
    return api.post("/auth/logout", data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

Auth.me = async () => {
    return api.get("/auth/users/me");
}

export default Auth;