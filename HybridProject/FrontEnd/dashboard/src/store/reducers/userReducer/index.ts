import { UserActionType, UserState } from "./types";

enum Roles {
    Teacher = "TEACHER",
    Student = "STUDENT",
    Admin = "ADMIN"
}

const initialState: UserState = {
    allUsers: [],
    loading: false,
    message: "",
    isAuth: false,
    selectedUser: null,
    user: {},
}

const UserReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case UserActionType.START_REQUEST:
            return { ...state, loading: true };// ...state - передаємо наш об'єкт і нічого в ньому міняти не будемо
        case UserActionType.FINISH_REQUEST:
            return { ...state, loading: false, message: action.payload };
        case UserActionType.ALL_USERS_LOADED:
            return { ...state, loading: false, allUsers: action.payload };
        case UserActionType.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload.decodedToken,
                message: action.payload.message,
            }
        case UserActionType.LOGOUT_USER_SUCCESS:
            return { allUsers: [], isAuth: false, loading: false, message: "", selectedUser: null, user: [] }
        default:
            return state;
    }
}

export default UserReducer;