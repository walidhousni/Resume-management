import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DropzoneWithPreview from "./DropzoneWithPreview";
import { Grid, Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

import CustomTextField from "./CustomTextField";
import { UploadFileAction } from "../../actions";
import renderCompetences from "../maltem-cv/common/Competences";
import renderEducations from "../maltem-cv/common/Educations";
import renderLangues from "../maltem-cv/common/Langues";
import renderExperiences from "../maltem-cv/common/Experiences";
import styled from "styled-components";

const styles = theme => ({
  cssFocused: {
    "&$cssFocused": {
      color: "green"
    }
  },
  form: {
    marginTop: 50,
    width: "90%"
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

const AddForm = styled.form`
  form-style {
    padding-bottom: 30px;
  }

  .paper-card {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .add-button {
    width: 100%;
    margin-bottom: 20px;
  }

  .add-button-child {
    width: 100%;
    margin-bottom: 20px;
  }

  .iconDiv {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 8px;

    .icon {
      color: #f44336;
      cursor: pointer;
    }
  }
`;

const validate = values => {
  const errors = {};
  const requiredFields = ["nom", "age", "phone"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class Profile extends Component {
  handleFileChange = files => {
    const file = files[0];
    UploadFileAction(file);
  };

  render() {
    const {
      handleSubmit,
      onSubmit,
      submitting,
      classes,
      match,
      pdfContent
    } = this.props;
    return (
      <div>Hello World</div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state, props) {
  return props.match.params.id
    ? {
        initialValues: { ...state.profileState.profieSelected }
      }
    : {
        initialValues: { ...state.profileState.uploadFileStatus },
        pdfContent: state.profileState.uploadFileStatus
      };
}

export default compose(
  connect(
    mapStateToProps,
    { UploadFileAction }
  ),
  reduxForm({
    form: "ProfileForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    validate
  })
)(withStyles(styles)(Profile));
