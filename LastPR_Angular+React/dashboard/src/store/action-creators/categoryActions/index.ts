import { Dispatch } from "redux";
import { CategoryActionType, CategoryActions } from "../../reducers/categoryReducers/types";
import { Create, Delete, Edit, GetAll, GetById } from "../../../services/api-category-service";
import { toast } from "react-toastify";
import { ICategory } from "../../../containers/admin/categories/types";

export const GetAllCategories = () => { // !!!!!!!!!!!!!
    return async (dispatch: Dispatch<CategoryActions>) => {
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
                type: CategoryActionType.GET_ALL_CATEGORIES,
                payload: response.payload
            });
        } catch { toast.error("Catch Error GetAllCategories()") }
    };
};

export const CreateCategory = (category: ICategory) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            dispatch({ type: CategoryActionType.CREATE_CATEGORY, payload: category });
            const data = await Create(category);
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

export const DeleteCategory = (id: string | number) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            dispatch({ type: CategoryActionType.DELETE_CATEGORY, payload: id });
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

export const EditCategory = (category: ICategory) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            dispatch({ type: CategoryActionType.EDIT_CATEGORY, payload: category });
            const data = await Edit(category);
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

export const GetCategoryById = (id: string | number) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            dispatch({ type: CategoryActionType.GET_CATEGORY_BY_ID, payload: id })
            const data = await GetById(id);
            console.log("data", data);

            if (data.success) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log("error", err);
        }
    }
}