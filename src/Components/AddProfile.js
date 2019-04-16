import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AddProfileAction, GetProfileAction, UpdateProfileAction, getLocation } from '../actions' 
import Profile from './common/Profile'
import _ from 'lodash'

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: '100%'
    }
});

class AddProfile extends Component {

    componentWillMount = () => {
        const { GetProfileAction, getLocation, history } = this.props;
        if(this.props.match.params.id){
            GetProfileAction(this.props.match.params.id)
        }
        const path = _.split(history.location.pathname, '/')[1]
        getLocation(path)
    }

    onSubmit = (values) => {
        const { AddProfileAction, UpdateProfileAction, match, history } = this.props;
        match.params.id ? UpdateProfileAction({
            id: match.params.id,
            ...values,
            tools: values.tools.split(","),
            technology: values.technology.split(","),
            mobility: values.mobility.split(","),
        }) : AddProfileAction({...values, username: localStorage.getItem('Username')})
        history.push('/search')
    }

    render() {
        const { classes, profieSelected, match } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Profile match={match} data={profieSelected} onSubmit={this.onSubmit} />
                </Grid>
            </div>
        )
    }
}

AddProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        values: state.form.ProfileForm && state.form.ProfileForm.values,
        statut: state.profileState.profileStatut,
        profieSelected: state.profileState.profieSelected
    }
}

export default withStyles(styles)(connect(mapStateToProps, { AddProfileAction, GetProfileAction, UpdateProfileAction, getLocation })(AddProfile))