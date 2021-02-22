import { setUserName, setUserPassword } from '../Action/UserAction'

export const project = ({ getState, dispatch }) => next => action => {
    if (action.type === 'SET_LOGGIN') {

        debugger

        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const userName = getState().UserReducer.user.name
        console.log(userName)
        const userPassword = getState().UserReducer.user.password

        // fetch(`http://localhost:3007/${userName}/${userPassword}/`, requestOptions)
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");



        fetch(`http://localhost:3007/user/getByIdAndPass/${action.payload.u}/${action.payload.p}/`, requestOptions)
            // fetch(`http://localhost:3007/user/getByIdAndPass/${userName}/${userPassword}/`, requestOptions)
            // 
            .then(response => response.json())
            .then(result => {
                // console.log('קיים')
                console.log(result)
                if (result.user) {
                    alert(`${action.payload.u} שלום ל`)
                    dispatch(setUserName(action.payload.u))
                    dispatch(setUserPassword(action.payload.p))
                }
                else {
                    alert(`אינו קיים במערכת ${action.payload.u}`)
                }
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return next(action)
}