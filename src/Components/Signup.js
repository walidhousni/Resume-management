import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Register from './common/Register'

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    }
});

class Signup extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Register />
                </Grid>
            </div>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Signup)