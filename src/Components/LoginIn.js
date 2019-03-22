import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Login from './common/Login'

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    }
});

class LoginIn extends Component {
    componentWillMount = () => {
        const { history } = this.props
        const Token = localStorage.getItem('Token')
        Token && history.push('/search')
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Login />
                </Grid>
            </div>
        )
    }
}

LoginIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoginIn)