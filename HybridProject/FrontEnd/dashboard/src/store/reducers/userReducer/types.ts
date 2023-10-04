export interface UserState { // export треба якщо хочемо до цього класу доступитись десь в іншому файлі (import perform)
    allUsers: any;
    loading: boolean;
    message: string;
    isAuth: boolean; // буде вказувати на те, що ми автентифікувалися
    selectedUser: any; // буде записуватись той юзер який в нас зараз залогінений
    user: any;
}

export enum UserActionType {
    START_REQUEST = "START_REQUEST ", // наш loading буде в true переводить
    FINISH_REQUEST = "FINISH_REQUEST", // наш loading буде в false переводить
    ALL_USERS_LOADED = "ALL_USERS_LOADED",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS", // user login is successfull
    LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS",
}

interface StartRequestAction {
    type: UserActionType.START_REQUEST;
}

interface FinishRequestAction {
    type: UserActionType.FINISH_REQUEST;
}

interface AllUsersLoadedAction {
    type: UserActionType.ALL_USERS_LOADED;
    payload: any; // сюда юзерів будем передавати
}

interface LoginUserSuccessAction {
    type: UserActionType.LOGIN_USER_SUCCESS;
    payload: any;
}

interface LogoutUserSuccessAction {
    type: UserActionType.LOGOUT_USER_SUCCESS;
}



export type UserActions = StartRequestAction | FinishRequestAction | AllUsersLoadedAction | LoginUserSuccessAction | LogoutUserSuccessAction;