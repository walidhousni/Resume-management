import React, { Component } from 'react'
import { connect } from "react-redux";
import { SignupAction } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import {
    Grid,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField
} from 'redux-form-material-ui';



const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    cssFocused: {
        '&$cssFocused': {
            color: 'green',
        },
    },
    form: {
        marginTop: 50,
        width: '45%'
    },
    button: {
        width: '100%',
        fontSize: 12,
        borderRadius: 0,
        marginTop: 10,
        backgroundColor: '#eb2f11',
        '&:hover': {
            backgroundColor: '#eb2f11',
        }
    },
    LeftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 19
    }
});

const validate = values => {
    const errors = {}
    const requiredFields = [
        'username',
        'password',
        'email'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class Register extends Component {
    onSubmit = (values) => {
        const { SignupAction } = this.props
        SignupAction(values);
    }

    render() {
        const { handleSubmit, pristine, submitting, classes } = this.props
        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form}>
                        <div>
                            <Field
                                name="fullname"
                                autoFocus={true}
                                component={TextField}
                                hintText="Fullname"
                                floatingLabelText="Fullname"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="username"
                                autoFocus={true}
                                component={TextField}
                                hintText="Username"
                                floatingLabelText="Username"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                autoFocus={true}
                                component={TextField}
                                hintText="Password"
                                type="password"
                                floatingLabelText="Password"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="email"
                                component={TextField}
                                type="email"
                                hintText="Email"
                                floatingLabelText="email"
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <Button type='submit' disabled={pristine || submitting} variant="contained" color="primary" className={classes.button}>
                                Signup
                            </Button>
                        </div>
                    </form>
                </Grid>
            </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate
})(withStyles(styles)(connect(null, { SignupAction })(Register)))