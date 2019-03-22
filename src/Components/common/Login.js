import React, { Component } from 'react'
import { connect } from "react-redux";
import { LoginAction } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import FieldText from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


import {
    Grid,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField
} from 'redux-form-material-ui'

const access = [
    {
        value: 'Admin',
        label: 'admin'
    },
    {
        value: 'RH',
        label: 'RH'
    },
    {
        value: 'Commercial',
        label: 'Commercial'
    }
]

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
        'email',
        'password'

    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}


class Login extends Component {

    onSubmit = (values) => {
        const { LoginAction } = this.props
        LoginAction(values);

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };
    

    render() {
        const { handleSubmit, pristine, submitting, classes } = this.props
        console.log(this.props)
        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form} >
                        <div>
                            <Field
                                name="username"
                                autoFocus={true}
                                component={TextField}
                                hintText="Username"
                                floatingLabelText="Username
                                "
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component={TextField}
                                type="password"
                                hintText="Password"
                                floatingLabelText="Password"
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <FieldText
                              id="select-form"
                              select
                              label="Select"
                              SelectProps={{
                                MenuProps: {
                                  className: classes.menu,
                                },
                              }}
                              onChange={this.handleChange('access')}
                              margin="normal"
                              helperText="Choisissez si vous etes."
                              fullWidth
                            >
                            {access.map(o => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                            </FieldText>
                        </div>
                        <div>
                            <Button type='submit' disabled={pristine || submitting} variant="contained" color="primary" className={classes.button}>
                                Login
                            </Button>
                        </div>
                    </form>
                </Grid>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate
})(withStyles(styles)(connect(null, { LoginAction })(Login)))