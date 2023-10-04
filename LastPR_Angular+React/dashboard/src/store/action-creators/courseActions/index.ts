import { Dispatch } from "redux";
import { CourseActionType, CourseActions } from "../../reducers/courseReducers/types";
import { Create, Delete, Edit, GetAll } from "../../../services/api-course-service";
import { toast } from "react-toastify";
import { ICourse } from "../../../containers/admin/courses/types";

export const GetAllCourses = () => {
    return async (dispatch: Dispatch<CourseActions>) => {
        try {
            const data = await GetAll();
            console.log("data", data);
            const response = data;
            console.log("response ", response);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
            dispatch({
                type: CourseActionType.GET_ALL,
                payload: response.payload
            });
        } catch { toast.error("Catch Error GetAllCourses()") }
    };
};

export const CreateCourse = (course: ICourse) => {
    return async (dispatch: Dispatch<CourseActions>) => {
        try {
            dispatch({ type: CourseActionType.CREATE_COURSE, payload: course });
            const data = await Create(course);
            console.log("data", data);

            if (data.success) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const DeleteCourse = (id: string | number) => {
    return async (dispatch: Dispatch<CourseActions>) => {
        try {
            dispatch({ type: CourseActionType.DELETE_COURSE, payload: id });
            const data = await Delete(id);
            console.log("data", data);

            if (data.success) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const EditCourse = (course: ICourse) => {
    return async (dispatch: Dispatch<CourseActions>) => {
        try {
            dispatch({ type: CourseActionType.EDIT_COURSE, payload: course });
            const data = await Edit(course);
            console.log("data", data);

            if (data.success) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}