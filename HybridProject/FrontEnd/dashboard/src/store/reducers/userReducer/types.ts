export interface UserState { // export треба якщо хочемо до цього класу доступитись десь в іншому файлі (import perform)
    allUsers: any;
    loading: boolean;
}

export enum UserActionType {
    START_REQUEST = "START_REQUEST ", // наш loading буде в true переводить
    FINISH_REQUEST = "FINISH_REQUEST", // наш loading буде в false переводить
    ALL_USERS_LOADED = "ALL_USERS_LOADED",
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

export type UserActions = StartRequestAction | FinishRequestAction | AllUsersLoadedAction;