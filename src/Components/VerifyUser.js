import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyUser } from "../actions";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "redux-form-material-ui";
import _ from "lodash";

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
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#eb2f11",
    position: "absolute",
    bottom: "25px",
    right: "30px",
    "&:hover": {
      backgroundColor: "#eb2f11"
    }
  },
  button: {
    width: "100%",
    fontSize: 12,
    borderRadius: 0,
    marginTop: 10,
    backgroundColor: "#eb2f11",
    "&:hover": {
      backgroundColor: "#eb2f11"
    }
  },
  LeftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 19
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["password1", "password2"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class VerifyUser extends Component {
  onSubmit = values => {
    const { match, verifyUser, reset } = this.props;
    verifyUser(values, match.params.id);
    reset();
  };

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form}>
            <div>
              <Field
                name="password1"
                autoFocus={true}
                type="password"
                component={TextField}
                hintText="Enter Your Password"
                label="Enter Your Password"
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="password2"
                component={TextField}
                type="password"
                hintText="Repeat Your Password"
                label="Repeat Your Password"
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
                Save Password
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

VerifyUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "VerifyForm", // a unique identifier for this form
  validate
})(
  withStyles(styles)(
    connect(
      null,
      { verifyUser }
    )(VerifyUser)
  )
);
