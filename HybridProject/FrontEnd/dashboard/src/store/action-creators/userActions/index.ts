import { Dispatch } from "redux"; // 
import { UserActions, UserActionType } from "../../reducers/userReducer/types";
import { InsertAsync } from "../../../services/api-user-services";

export const InsertUser = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionType.START_REQUEST });
            const data = await InsertAsync(user); // в data прийде відповідь від сервера
            const { response } = data;
            console.log("InsertUser: ", response);
        }
        catch {
            console.log("ERROR INSERT USER");
        }
    }
}