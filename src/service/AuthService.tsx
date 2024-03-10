import { client } from "./BaseService"

export const AuthAPI = {
    register: async function register(email: string, password: string) {
        return await client.post("/auth/register", {
            email: email,
            password: password
        });
    },

    login: async function login(email: string, password: string) {
        return await client.post("/auth/jwt", {
            username: email,
            password: password
        });
    }
}