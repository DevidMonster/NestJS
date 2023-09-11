import { instance } from "./instance";
export const loginApi = (user) => {
    return instance.post('/login', user);
 };