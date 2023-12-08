import axios, { AxiosResponse } from "axios";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number; // Mengubah menjadi tipe number karena nilai '3' adalah angka
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}
const HOST = "https://fakestoreapi.com";

export const login = (body: any): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/auth/login`;
    return axios.post(URL, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const register = (body: any): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/users`;
    return axios.post(URL, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const addUser = (body: any): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/users`;
    return axios.post(URL, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const totalUser = (): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/users`;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const allUser = (limit: number): Promise<AxiosResponse<User[]>> => {
    const URL = `${HOST}/users?limit=${limit}`;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const detailUser = (id: number): Promise<AxiosResponse<User>> => {
    const URL = `${HOST}/users/${id}`;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const EditUser = (
    id: number,
    body: any
): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/users/${id}`;
    return axios.put(URL, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteUser = (id: number): Promise<AxiosResponse<any>> => {
    const URL = `${HOST}/users/${id}`;
    return axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
