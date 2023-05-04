const IsLoginReducer = (state = localStorage.getItem('token'), action) => {
    switch (action.type) {
        case 'LOGIN':
            return true;
            break;
        case 'LOGOUT':
            return false;
            break;
        default:
            return state;
            break;
    }
}

export default IsLoginReducer;
