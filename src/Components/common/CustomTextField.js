import React from "react";
import { TextField } from "@material-ui/core";

const CustomTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      label={label}
      {...input}
      {...custom}
    />
  );

export default CustomTextField;
