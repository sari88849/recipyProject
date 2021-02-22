import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { setUserName, setUserPassword, setLoggin } from '../Redux/Action/UserAction';
import AddUser from './AddUser';
import Nav from './AddUser';
import './Login.css'
import logo1 from '../pictures/logo1.jpg'


const mapDispatchToProps = (dispatch) => ({
    // uName: (name) => dispatch(setUserName(name)),
    // uPassword: (pass) => dispatch(setUserPassword(pass)),
    loggin: (userCurrent) => dispatch(setLoggin(userCurrent))
})

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {

    const { uName, uPassword, loggin, user } = props

    const history = useHistory();


    const userName = React.createRef()
    const userPass = React.createRef()

    function newUser() {
        history.push('/addUser')
    }

    function pageNav() {
        if (user.name && user.password) {
            history.push('/nav')
        }
    }

    function signin() {

        const userCurrent = {
            u: userName.current.value,
            p: userPass.current.value
        }

        loggin(userCurrent)


    }

    return (
        <>
            <body style={{ backgroundColor: 'grey' }}>
                <br></br>
                <br></br>
                <div style={{ width: '50%', height: '50%', backgroundColor: 'white', marginLeft: '25%' }}>


                    <br></br><br></br><br></br>
                    <svg id='person' xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <br></br><br></br><br></br>


                    {/* <br></br><br></br><br></br> */}

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
                            <input id='ll' type="text" style={{ textAlign: 'center' }} placeholder='הכנס שם משתמש' ref={userName} className="form-control" id="inlineFormInputGroup" ></input>
                        </div>
                    </div>

                    <div className="col-auto">
                        <label className="sr-only" >Username</label>
                        <div className="input-group mb-2" style={{ width: '60%', marginLeft: '20%', textAlign: 'center' }}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>                       </div>
                            </div>
                            <input id='ll' type="password" style={{ textAlign: 'center' }} placeholder='הכנס סיסמא' ref={userPass} className="form-control" id="inlineFormInputGroup" ></input>
                        </div>
                    </div>
                    <br></br>
                    {/* ,*/}
                    <div className='row'>
                        <button id='bbb' style={{ width: 250, height: 40, marginLeft: '20%' }} onClick={newUser}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                            </svg>  יצירת משתמש חדש</button>


                        <button id='bbb' style={{ width: 250, height: 40, marginLeft: '1%' }} onClick={signin}>
                            לכניסה  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-forward" viewBox="0 0 16 16">
                                <path d="M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z" />
                            </svg>
                        </button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br><br></br>


                    </div>






                    {/* <Switch>
                    <Route exact path='/addUser'>
                        <AddUser></AddUser>
                    </Route>
                </Switch> */}
                    {/* </Router> */}
                    {pageNav()}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </body>
        </>
    )
})