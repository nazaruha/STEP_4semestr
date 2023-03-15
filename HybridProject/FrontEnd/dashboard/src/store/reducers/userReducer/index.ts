const initialState: any ={
    user: {},
    allUsers: []
}

const userReducer = (state = initialState, action: any): any => {
    switch(action.type) {
        default:
            return state;
    }
}

export default userReducer;