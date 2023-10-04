import axios from 'axios';
import { getAccessToken, getrefreshToken, setAccessToken, setRefreshToken } from "../helpers/tokenHelper";
import { ICategory } from '../containers/admin/categories/types';
import { ICourse } from '../containers/admin/courses/types';

export const httpCourse = axios.create({
    baseURL: 'https://localhost:5000/api/Course',
    headers: {
        "Content-Type": "application/json"
    }
})
httpCourse.interceptors.request.use(
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
httpCourse.interceptors.response.use(
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
                    httpCourse.defaults.headers.common["Authorization"] =
                        "Bearer " + accessToken;
                    return httpCourse(originalConfig);
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
    return httpCourse.post("/RefreshToken", {
        token: getAccessToken(),
        refreshToken: getrefreshToken(),
    });
}

const responseBody: any = (response: any) => response.data;

const request = {
    get: (url: string) => httpCourse.get(url).then().then(responseBody),
    post: (url: string, body?: any) =>
        httpCourse.post(url, body).then().then(responseBody),
    delete: (url: string) =>
        httpCourse.delete(url).then().then(responseBody),
    edit: (url: string, body?: any) =>
        httpCourse.post(url, body).then().then(responseBody),
};

const Course = {
    GetAll: () => request.get("/courses"),
    Create: (course: ICourse) => request.post("/create", course),
    Delete: (id: string | number) => request.delete(`/delete/${id}`),
    Edit: (course: ICourse) => request.edit("/update", course),
}

export async function GetAll() {
    const data = await Course.GetAll()
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service ", data);
    return data;
}

export async function Create(course: ICourse) {
    const data = await Course.Create(course)
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
    const data = await Course.Delete(id)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

export async function Edit(course: ICourse) {
    const data = await Course.Edit(course)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        })
    console.log("In service", data);
    return data;
}

