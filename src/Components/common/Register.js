import React, { Component } from "react";
import { connect } from "react-redux";
import { SignupAction, getUsers } from "../../actions";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CustomTextField from "./CustomTextField";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  form: {
    marginTop: 20,
    width: "45%"
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
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password", "email", "role", "fullname"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} style={{ width: "100%" }}>
    <InputLabel htmlFor="role-native-simple">Role</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "role",
        id: "role-native-simple"
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

class Register extends Component {
  onSubmit = values => {
    const { SignupAction, reset, history, getUsers } = this.props;
    SignupAction(values);
    reset();
    getUsers();
    history && history.push("/dashboard/users");
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      params,
      history
    } = this.props;
    console.log(history);
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form}>
            <div>
              <Field
                name="fullname"
                autoFocus={true}
                component={CustomTextField}
                hintText="Fullname"
                label="Fullname"
                fullWidth={true}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div>
              <Field
                name="username"
                component={CustomTextField}
                hintText="Username"
                label="Username"
                fullWidth={true}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div>
              <Field
                classes={classes}
                name="role"
                component={renderSelectField}
                label="Role"
              >
                <option value="" />
                {params && <option value={params.admin}>{params.admin}</option>}
                {params && <option value={params.rh}>{params.rh}</option>}
                {params && <option value={params.com}>{params.com}</option>}
              </Field>
            </div>
            <div>
              <Field
                name="email"
                component={CustomTextField}
                type="Email"
                hintText="Email"
                label="Email"
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
                Signup
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "RegisterForm", // a unique identifier for this form
  validate
})(
  withStyles(styles)(
    connect(
      null,
      { SignupAction, getUsers }
    )(Register)
  )
);
