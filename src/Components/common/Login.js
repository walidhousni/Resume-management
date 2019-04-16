import React, { Component } from "react";
import { connect } from "react-redux";
import { LoginAction } from "../../actions";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import CustomTextField from "./CustomTextField";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  cssFocused: {
    "&$cssFocused": {
      color: "green"
    }
  },
  form: {
    marginTop: 50,
    width: "45%"
  },
  button: {
    width: "100%",
    fontSize: 12,
    borderRadius: 0,
    marginTop: 10
  },
  LeftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 19
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class Login extends Component {
  onSubmit = values => {
    const { LoginAction } = this.props;
    LoginAction(values);
  };

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form}>
            <div>
              <Field
                name="username"
                autoFocus={true}
                component={CustomTextField}
                label="Username"
                fullWidth={true}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div>
              <Field
                name="password"
                component={CustomTextField}
                type="password"
                label="Password"
                fullWidth={true}
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={pristine || submitting}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "LoginForm", // a unique identifier for this form
  validate
})(
  withStyles(styles)(
    connect(
      null,
      { LoginAction }
    )(Login)
  )
);
