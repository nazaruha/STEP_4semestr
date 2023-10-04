import axios from 'axios';
import { getAccessToken, getrefreshToken, setAccessToken, setRefreshToken } from "../helpers/tokenHelper";
import { ICategory } from '../containers/admin/categories/types';

export const httpCategory = axios.create({
    baseURL: 'https://localhost:5000/api/Category',
    headers: {
        "Content-Type": "application/json"
    }
})
httpCategory.interceptors.request.use(
    (config: any) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
httpCategory.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Validation failed, ...
            if (err.response.status === 400 && err.response.data) {
                return Promise.reject(err.response.data);
            }
            // Access Token was expired
            if (
                err.response.status === 401 &&
                !originalConfig._retry &&
                getAccessToken() != null
            ) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshAccessToken();
                    const { accessToken, refreshToken } = rs.data;
                    setRefreshToken(refreshToken);
                    setAccessToken(accessToken);
                    httpCategory.defaults.headers.common["Authorization"] =
                        "Bearer " + accessToken;
                    return httpCategory(originalConfig);
                } catch (_error: any) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
            if (err.response.status === 404) {
                if (axios.isAxiosError(err)) {
                    return Promise.reject(err.response.data);
                }
                return;
            }
        }
        return Promise.reject(err);
    }
);

function refreshAccessToken() {
    console.log("refreshAccessToken");
    return httpCategory.post("/RefreshToken", {
        token: getAccessToken(),
        refreshToken: getrefreshToken(),
    });
}

const responseBody: any = (response: any) => response.data;

const request = {
    get: (url: string) => httpCategory.get(url).then().then(responseBody),
    post: (url: string, body?: any) =>
        httpCategory.post(url, body).then().then(responseBody),
    delete: (url: string) =>
        httpCategory.delete(url).then().then(responseBody),
    edit: (url: string, body?: any) =>
        httpCategory.post(url, body).then().then(responseBody),
};

const Category = {
    GetAll: () => request.get("/categories"),
    Create: (category: ICategory) => request.post("/create", category),
    Delete: (id: string | number) => request.delete(`/delete/${id}`),
    Edit: (category: ICategory) => request.edit("/update", category),
    GetById: (id: string | number) => request.get(`/get-by-id/${id}`),
}

export async function GetAll() {
    const data = await Category.GetAll()
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service ", data);
    return data;
}

export async function Create(category: ICategory) {
    const data = await Category.Create(category)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

export async function Delete(id: string | number) {
    const data = await Category.Delete(id)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

export async function Edit(category: ICategory) {
    const data = await Category.Edit(category)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

export async function GetById(id: string | number) {
    const data = await Category.GetById(id)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

