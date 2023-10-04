import { CategoryState, CategoryActions, CategoryActionType } from "./types";

const initialState: CategoryState = {
    allCategories: [],
    category: null,
    id: 0,
    name: "",
    description: ""
}

const CategoryReducer = (state = initialState, action: CategoryActions): CategoryState => {
    switch (action.type) {
        case CategoryActionType.GET_ALL_CATEGORIES:
            return { ...state, allCategories: action.payload };
        case CategoryActionType.CREATE_CATEGORY:
            return { ...state, category: action.payload };
        case CategoryActionType.DELETE_CATEGORY:
            return { ...state, id: action.payload };
        case CategoryActionType.EDIT_CATEGORY:
            return { ...state, category: action.payload };
        case CategoryActionType.GET_CATEGORY_BY_ID:
            return { ...state, category: action.payload };
        default:
            return state;
    }
};

export default CategoryReducer;
