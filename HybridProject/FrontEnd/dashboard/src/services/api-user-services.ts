import axios from "axios"; // аналог fetch'a. Для того, щоб підключити бек наш

const instance = axios.create({
    baseURL: "https://localhost:5001/api/User", // всі запити будуть йти по цій URL
    headers: {
        "Content-Type": "application/json",
    },
});

const responseBody: any = (response: any) => responseBody.data;

const request = {
    get: (url: string) => instance.get(url).then().then(responseBody),
    post: (url: string, body?: any) => instance.post(url).then().then(responseBody),
};

const User = {
    Insert: (user: any) => request.post("/register", user),
};

export async function InsertAsync(user: any) {
    const data = await User.Insert(user)
        .then((response) => {
            return { response };
        })
        .catch((error) => {
            return error.response;
        });

    return data;
}

