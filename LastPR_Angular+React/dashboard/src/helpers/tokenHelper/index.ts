export function setAccessToken(token: string) {
    window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
    window.localStorage.setItem("refreshToken", token);
}

export function getAccessToken(): null | string {
    const accessToken = window.localStorage.getItem("accessToken");
    return accessToken;
}

export function getrefreshToken(): null | string {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
}

export function removeTokens() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
}