let initialState = {
    user: {}
}

const USER_DATA = 'USER_DATA'

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, {user: action.payload})
        default:
            return state
    }
}

export function getUserData(user){
    return {
        type: USER_DATA,
        payload: user
    }
}