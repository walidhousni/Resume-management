import React from 'react'
import { Router, Switch, Route,withRouter } from 'react-router-dom'
import Home from '../Components/Home'
import LoginIn from '../Components/LoginIn'
import Signup from '../Components/Signup'
import AddProfile from '../Components/AddProfile'
import SearchResult from '../Components/SearchResult'
import Header from '../Components/Header'
import ShowProfile from '../Components/ShowProfile'
import MaltemCv from '../Components/maltem-cv'
import AuthComp from '../Components/AuthComp'
import history from '../utils/history';

const Main = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={LoginIn} />
                <Route exact path='/register' component={Signup} />
                <AuthComp>
                    <Route exact path='/search' component={Home} />
                    <Route exact path='/profile/:id' component={ShowProfile} />
                    <Route exact path='/add-profile' component={AddProfile} />
                    <Route exact path='/maltem-cv/:id' component={MaltemCv} />
                    <Route path='/search-result' component={SearchResult} />
                    <Route path='/edit-profile/:id' component={AddProfile} />
                </AuthComp>
            </Switch>
        </div>
    </Router>
)

export default withRouter(Main);