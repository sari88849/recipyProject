import produce from 'immer'

const initialState = {
    user: {
        name: '',
        password: ''
    }
}

export default produce((state, action) => {
    switch (action.type) {
        case 'SET_USER_NAME': {
            state.user.name = action.payload
            break;
        }
        case 'SET_USER_PASSWORD': {
            state.user.password = action.payload
            break;
        }

        case 'SET_USER_NAME1': {
            state.user.name = action.payload
            break;
        }

        case 'SET_USER_PASSWORD1': {
            state.user.password = action.payload
            break;
        }
    }
}, initialState)