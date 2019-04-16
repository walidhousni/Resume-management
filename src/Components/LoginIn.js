import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import _ from 'lodash';

import Login from './common/Login';
import { getLocation } from '../actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    }
});

class LoginIn extends Component {
    componentWillMount = () => {
        const { history, getLocation } = this.props
        const Token = localStorage.getItem('Token')
        const path = _.split(history.location.pathname, '/')[1]
        getLocation(path)
        Token && history.push('/search')
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Login />
            </Grid>
        )
    }
}

LoginIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(null, { getLocation })(LoginIn))
