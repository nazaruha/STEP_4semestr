export interface CategoryState {
    allCategories: [],
    category: any,
    id: number,
    name: string,
    description: string
}

export enum CategoryActionType {
    GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY",
    EDIT_CATEGORY = "EDIT_CATEGORY",
    GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID",
}

interface GetAllCategoriesAction {
    type: CategoryActionType.GET_ALL_CATEGORIES,
    payload: any
}

interface CreateCategoryAction {
    type: CategoryActionType.CREATE_CATEGORY,
    payload: any
}

interface DeleteCategoryAction {
    type: CategoryActionType.DELETE_CATEGORY,
    payload: any
}

interface EditCategoryAction {
    type: CategoryActionType.EDIT_CATEGORY,
    payload: any
}

interface GetCategoryByIdAction {
    type: CategoryActionType.GET_CATEGORY_BY_ID,
    payload: any
}

export type CategoryActions =
    | GetAllCategoriesAction
    | CreateCategoryAction
    | DeleteCategoryAction
    | EditCategoryAction
    | GetCategoryByIdAction;