export function setUserName(name) {
    return {
        type: 'SET_USER_NAME',
        payload: name
    }
}

export function setUserPassword(pass) {
    return {
        type: 'SET_USER_PASSWORD',
        payload: pass
    }
}

/////אם המשתמש לא קיים במערכת- הוא יאתחל את הסטייט

export function setUserName1() {
    return {
        type: 'SET_USER_NAME1',
        payload: ''
    }
}

export function setUserPassword1() {
    return {
        type: 'SET_USER_PASSWORD1',
        payload: ''
    }
}

export function setLoggin(userCurrent) {
    return {
        type: 'SET_LOGGIN',
        payload: userCurrent
    }
}

