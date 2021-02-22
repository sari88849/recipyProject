import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './Login'
import Mydetails from './Mydetails'
import Pizza from './Pizza'
import './Nav.css'

// פונקצייה שמביאה נתונים מהרידקס
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(function Nav(props) {

    const { user } = props

    return (
        <><br></br>
            <Router>
                {/* <Link to='/nav'>
                    <button className='btn btn-primary btn-lg'>מתכונים</button> */}
                {/* recipy */}
                {/* </Link> */}

                {/* <Link to='/myDetails'>
                    <button className='btn btn-primary btn-lg' style={{ marginLeft: 100 }}>לספר מתכונים</button> */}
                {/* my details */}
                {/* </Link> */}

                {/* ...ניתובים */}
                <ul>
                    <li> <button><Link to='/myDetails' style={{ color: 'black', fontSize: '110%' }}><b>לספר מתכונים</b></Link></button></li>
                    <li><button > <Link to='/nav' style={{ color: 'black', fontSize: '110%' }}><b>מתכונים</b></Link></button></li>
                    <li style={{ fontSize: '150%', marginTop: '0.9%', marginLeft: '65%', color: 'white' }}> משתמש: {user.name} </li>


                </ul>
                <hr />
                <Switch>
                    {/* <Route exact path='/'>
                        <Login></Login>
                    </Route> */}
                    <Route exact path='/nav'>
                        <Pizza></Pizza>
                    </Route>
                    <Route path='/myDetails'>
                        <Mydetails></Mydetails>
                    </Route>
                </Switch>
            </Router>
        </>
    )
})