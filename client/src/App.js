import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Login from './components/Login';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddUser from './components/AddUser';
import Nav from './components/Nav';



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>


            <Route path='/nav'>
              {/* <Login></Login> */}
              {/* <Login></Login> */}
              <Nav></Nav>
            </Route>

            <Route exact path='/addUser'>

              <AddUser></AddUser>
            </Route>

            <Route exact path='/'>
              <Login></Login>
            </Route>


          </Switch>
        </Router>
      </Provider>

    </div>
  );
}

export default App;
