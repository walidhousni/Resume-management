import React from 'react'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import Home from '../Components/Home'
import LoginIn from '../Components/LoginIn'
import AddProfile from '../Components/AddProfile'
import SearchResult from '../Components/SearchResult'
import ShowProfile from '../Components/ShowProfile'
import Dashboard from '../Components/Dashboard'
import VerifyUser from '../Components/VerifyUser'
import MaltemCv from '../Components/maltem-cv'
import AuthComp from '../Components/AuthComp'
import history from '../utils/history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Components/Layout';

const Main = () => (
    <Layout>
        <Router history={history}>
            <>
                <Switch>
                    <Route exact path='/' component={LoginIn} />
                    <Route exact path='/verifyuser/:id' component={VerifyUser} />
                    <AuthComp>
                        <Route exact path='/search' component={Home} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route exact path='/profile/:id' component={ShowProfile} />
                        <Route exact path='/add-profile' component={AddProfile} />
                        <Route exact path='/maltem-cv/:id' component={MaltemCv} />
                        <Route path='/search-result' component={SearchResult} />
                        <Route path='/edit-profile/:id' component={AddProfile} />
                    </AuthComp>
                </Switch>
                <ToastContainer />
            </>
        </Router>
    </Layout>
)

export default withRouter(Main);
