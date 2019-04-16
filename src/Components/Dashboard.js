import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLocation } from '../actions'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Groupe from '@material-ui/icons/Group';
import PersonAdd from '@material-ui/icons/PersonAdd';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect 
} from "react-router-dom";
import AllUser from './common/AllUser'
import AddUser from './common/AddUser'

const Div = styled.div`
    width: 95%;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;

    .nav-list {
        width: 20%;
    }

    .div-content {
        width: 80%;
    }
`
  
const styles = theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper
    },
    tab: {
        flex: 1,
        minWidth: 'auto',
        maxWidth: 'none'
    }
});

class Dashboard extends Component {
    state = {
        value: 1,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentWillMount(){
        const { getLocation, history } = this.props;
        const role = localStorage.getItem('Role')
        const token = localStorage.getItem('Token')
        const path = _.split(history.location.pathname, '/')[1]
        if(token && role !== 'admin') {
            history.push('/search')
        }
        getLocation(path)
    }

    render () {
        const { classes, theme } = this.props;
        return (
            <Div>
                <List component="nav" className='nav-list' >
                    <Link to='/dashboard/users' >
                        <ListItem button>
                            <ListItemIcon>
                                <Groupe />
                            </ListItemIcon>
                            <ListItemText primary="All User" />
                        </ListItem>
                    </Link>
                    <Link to='/dashboard/add' >
                        <ListItem button>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary="Add User" />
                        </ListItem>
                    </Link>
                </List>
                <div className='div-content' >
                    <Redirect  to="/dashboard/users" />
                    <Route path="/dashboard/users" component={AllUser} />
                    <Route path="/dashboard/add" component={AddUser} />
                </div>
            </Div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect(null, { getLocation })(Dashboard))