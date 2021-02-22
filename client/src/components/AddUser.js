import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserName, setUserPassword } from '../Redux/Action/UserAction';
import firebase from './Firebase'
import './AddUser.css'

// פונקצייה ששולחת ערכים לאקשיין
const mapDispatchToProps = (dispatch) => ({
    uName: (name) => dispatch(setUserName(name)),
    uPassword: (pass) => dispatch(setUserPassword(pass))
})



export default connect(null, mapDispatchToProps)(function AddUser(props) {

    const { uName, uPassword } = props

    const userName = React.createRef()
    const userPassword = React.createRef()
    const userPassword1 = React.createRef()

    const history = useHistory()

    // פונקצייה שמוסיפה אדם למערך האנשים
    function add() {
        if (userPassword.current.value === userPassword1.current.value) {
            uName(userName.current.value)
            uPassword(userPassword.current.value)

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("name", userName.current.value);
            urlencoded.append("password", userPassword.current.value);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            // firebase.auth().createUserWithEmailAndPassword(userName, userPassword)
            // .then((user) => {
            // console.log(user)
            fetch("http://localhost:3007/user/newUser/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // localStorage.setItem('token', result.token)
                    // console.log('token ', result.token)
                    // if (result._id) {
                    //      localStorage.setItem('token', result.token)
                    //     console.log(result.token)
                    // }
                    alert('הבנ"א נוסף בהצלחה')
                    console.log(result)
                    history.push('/nav')
                })
                // })




                .catch(error => console.log('error', error));
        }
        else {
            userPassword1.current.value = ''
            userPassword.current.value = ''
            alert('הסיסמאות אינן תואמות- עליך למלא שוב')
        }


    }

    return (

        <>
            <body style={{ backgroundColor: 'grey' }}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ width: '50%', height: '50%', backgroundColor: 'white', marginLeft: '25%' }}>


                    <br></br><br></br>
                    <i className="bi bi-person-circle"></i>
                    <svg id='person' xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    <br></br><br></br><br></br>
                    <div className="col-auto">
                        <label className="sr-only">Username</label>
                        <div className="input-group mb-2" style={{ width: '60%', marginLeft: '20%', textAlign: 'center' }}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                    </svg>                        </div>
                            </div>
                            <input type="text" style={{ textAlign: 'center' }} placeholder='הכנס שם משתמש' ref={userName} className="form-control" id="inlineFormInputGroup" ></input>
                        </div>
                    </div>

                    <div className="col-auto">
                        <label className="sr-only" >userPassword</label>
                        <div className="input-group mb-2" style={{ width: '60%', marginLeft: '20%', textAlign: 'center' }}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>                       </div>
                            </div>
                            <input type="password" style={{ textAlign: 'center' }} placeholder='הכנס סיסמא' ref={userPassword} className="form-control" id="inlineFormInputGroup" ></input>
                        </div>
                    </div>

                    <div className="col-auto">
                        <label className="sr-only" >userPassword1</label>
                        <div className="input-group mb-2" style={{ width: '60%', marginLeft: '20%', textAlign: 'center' }}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>                       </div>
                            </div>
                            <input type="password" style={{ textAlign: 'center' }} placeholder='לצורך אימות- הכנס שוב סיסמא' ref={userPassword1} className="form-control" id="inlineFormInputGroup" ></input>
                        </div>
                    </div>
                    <br></br>





                    <button onClick={add} id='bbb'>
                        <svg marginRight='90%' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg> הוסף</button>
                    <br></br><br></br><br></br><br></br>
                </div>
                <br></br>
                <br></br> <br></br> <br></br><br></br>
            </body>
        </>
    )
})