import { Dispatch } from "redux"; // 
import { UserActions, UserActionType } from "../../reducers/userReducer/types";
import { InsertAsync, LoginAsync, LogoutAsync, removeTokens, setAccessToken, setRefreshToken, UsersAsync } from "../../../services/api-user-services";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
// import { access } from "fs";

export const InsertUser = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionType.START_REQUEST });
            const data = await InsertAsync(user); // в data прийде відповідь від сервера
            const { response } = data;
            console.log("userAction response", response);
            if (response.success) {
                toast.success(response.message);
            }
            else {
                toast.error(response.errors[0]);
            }
            dispatch({ type: UserActionType.FINISH_REQUEST, payload: response.message });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const LoginUser = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionType.START_REQUEST });
            const data = await LoginAsync(user);
            const { response } = data;
            console.log("userAction response", response);
            if (response.success) {
                const { accessToken, refreshToken, message } = data.response; // деструктеризація
                removeTokens();
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                toast.success(response.message);
                AuthUser(accessToken, refreshToken, dispatch);
            }
            else {
                toast.error(response.message);
            }
            dispatch({ type: UserActionType.FINISH_REQUEST, payload: response.message });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const LogOutUser = (id: string) => {
    console.log("LogOutUser => ", id);
    return async (dispatch: Dispatch<UserActions>) => {
        const data = await LogoutAsync(id);
        const { response } = data;
        if (response.success) {
            removeTokens();
            dispatch({ type: UserActionType.LOGOUT_USER_SUCCESS })
        }
    }
}

export const AuthUser = (
    token: string,
    message: string,
    dispatch: Dispatch<UserActions>
) => {
    const decodedToken = jwtDecode(token) as any; // 'npm i jwt-decode' requires
    dispatch({
        type: UserActionType.LOGIN_USER_SUCCESS,
        payload: {
            message,
            decodedToken,
        },
    });
};


export const Users = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionType.START_REQUEST });
            const data = await UsersAsync();
            const { response } = data;
            console.log(" userAction response", response);
            if (response.success) {
                // toast.success(response.message);
                dispatch({ type: UserActionType.ALL_USERS_LOADED, payload: response.payload });
            }
            else {
                toast.error(response.message);
            }
            dispatch({ type: UserActionType.FINISH_REQUEST, payload: response.message });
        }
        catch (error) {
            console.log(error);
        }
    }
}
