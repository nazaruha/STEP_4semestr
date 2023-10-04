import { CourseState, CourseActions, CourseActionType } from "./types";

const initialState: CourseState = {
    allCourses: [],
    course: null,
    id: 0,
    title: "",
    description: "",
    price: 0,
    imagePath: "",
    categoryId: 0,
};
const CourseReducer = (state = initialState, action: CourseActions): CourseState => {
    switch (action.type) {
        case CourseActionType.GET_ALL:
            return { ...state, allCourses: action.payload };
        case CourseActionType.CREATE_COURSE:
            return { ...state, course: action.payload };
        case CourseActionType.DELETE_COURSE:
            return { ...state, id: action.payload };
        case CourseActionType.EDIT_COURSE:
            return { ...state, course: action.payload };
        default:
            return state;
    }
};

export default CourseReducer;
