export interface CourseState {
    allCourses: [],
    course: any,
    id: number,
    title: string,
    description: string,
    price: number,
    imagePath: string,
    categoryId: number,
}

export enum CourseActionType {
    GET_ALL = "GET_ALL_COURSES",
    CREATE_COURSE = "CREATE_COURSE",
    DELETE_COURSE = "DELETE_COURSE",
    EDIT_COURSE = "EDIT_COURSE",
}

interface GetAllCoursesAction {
    type: CourseActionType.GET_ALL,
    payload: any
}

interface CreateCourseAction {
    type: CourseActionType.CREATE_COURSE,
    payload: any
}

interface DeleteCourseAction {
    type: CourseActionType.DELETE_COURSE,
    payload: any
}

interface EditCourseAction {
    type: CourseActionType.EDIT_COURSE,
    payload: any
}

export type CourseActions =
    | GetAllCoursesAction
    | CreateCourseAction
    | DeleteCourseAction
    | EditCourseAction;