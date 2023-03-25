import { UserActionType, UserState } from "./types";

enum Roles {
    Teacher = "TEACHER",
    Student = "STUDENT",
    Admin = "ADMIN"
}

const initialState: UserState = {
    allUsers: [
        {
            id: 1,
            name: "Bill",
            surname: "Smith",
            phone: "+(380)-96083398",
            email: "skjskdj@gmail.com",
            role: Roles.Student
        },
        {
            id: 2,
            name: "Camila",
            surname: "Smith",
            phone: "+(380)-948343847",
            email: "nwdosna@gmail.com",
            role: Roles.Teacher
        },
        {
            id: 3,
            name: "Bane",
            surname: "Johnson",
            phone: "+(380)-853746284",
            email: "cnuhri@gmail.com",
            role: Roles.Admin
        },
        {
            id: 4,
            name: "Kalie",
            surname: "Monro",
            phone: "+(380)-24767676",
            email: "ncubyergei@gmail.com",
            role: Roles.Teacher
        },
        {
            id: 5,
            name: "Baki",
            surname: "Hanmna",
            phone: "+(380)-21073746",
            email: "cmpeifjiro@gmail.com",
            role: Roles.Student
        },
        {
            id: 6,
            name: "Roma",
            surname: "Krauch",
            phone: "+(380)-401767469",
            email: "dfnuiheo@gmail.com",
            role: Roles.Student
        },
    ],
    loading: false,
}

const UserReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case UserActionType.START_REQUEST:
            return { ...state, loading: true };// ...state - передаємо наш об'єкт і нічого в ньому міняти не будемо
        case UserActionType.FINISH_REQUEST:
            return { ...state, loading: false };
        case UserActionType.ALL_USERS_LOADED:
            return { ...state, loading: false, allUsers: action.payload }
        default:
            return state;
    }
}

export default UserReducer;