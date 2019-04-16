import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  SearchAction,
  SearchDataAction,
  resetForm,
  getLocation
} from "../actions";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import CustomTextField from "./common/CustomTextField";
import { HomeMaltemBrand, ArrowSearch } from './common/icons';
import styled from 'styled-components';
import _ from "lodash";

const HomePresentationDiv = styled.div`
   margin: 0 auto;
   position: relative;
   top: 25px;
   text-align: center;

   & h1 { 
     margin: 0;
     padding-top: 50px;
     font-size: 16px;
     line-height: 1.31;
     letter-spacing: -0.3px;
     color: #626262;
   }

   & h2 {
     margin: 0;
     font-size: 28px;
     color: #eb2f11;
   }
`

const SearchAdvandedContainer = styled.div`
    padding-top: 25px;
    cursor: pointer;
    display: flex;
    float:  right;

    & svg {
       width: 20px;
    }
`;

const AdvancedForm = styled.div`
   opacity: ${props => (props.open ? "1" : "0")};
   max-height: ${props => (props.open ? "100%" : "0")};
   padding: ${props => (props.open ? "15px" : "0 15px")};
   transition: all 0.3s
`

const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    borderRadius: 50,
    height: 50
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: '#000',
    },
  },
  cssFocused: {
    "&$cssFocused": {
      color: "green"
    }
  },
  form: {
    marginTop: 70,
    width: "45%",
    margin: '0 auto'
  },
  fab: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: "25px",
    right: "30px"
  },
  fieldset: {
     border: 'none'
  },
  button: {
    width: "100%",
    fontSize: 12,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#EB2F11'
  },
  LeftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 19
  },
  inputStyle: {
    borderRadius: 50,
    backgroundColor: '#EFEFEF',


    '&$notchedOutline': {
      borderColor: '#EFEFEF !important',
      opacity: '0.60',
      height: 50
  }
  },
  notchedOutline: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline':  {
      border: 'none'
    }
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class Home extends Component {
  constructor() {
    super();
    this.state = {};
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
  }

  toggleAdvanced = () => {
     this.setState({ open: !this.state.open });
  }

  onSubmit = values => {
    const { SearchDataAction, history } = this.props;
    SearchDataAction(values);
    history.push("/search-result");
  };

  componentWillMount() {
    const { getLocation, history } = this.props;
    const path = _.split(history.location.pathname, "/")[1];
    getLocation(path);
  }

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    const { open } = this.state;
    return (
         <Fragment >
              <HomePresentationDiv>
                 <HomeMaltemBrand />
                 <h1>Maltem Seeker</h1>
                 <h2>Talents Library !</h2>
              </HomePresentationDiv>
               <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form}>
               <Field
                      name="term"
                      component={CustomTextField}
                      fullWidth={true}
                      placeholder="Search"
                      InputProps={{
                        disableUnderline: true,
                        classes:{
                          root: classes.root,
                          notchedOutline: classes.notchedOutline
                        },
                       startAdornment: (
                         <InputAdornment position="start">
                         <SearchIcon />
                         </InputAdornment>
                       )
                      }}
                   />
                    <SearchAdvandedContainer onClick={this.toggleAdvanced}>
                      <ArrowSearch open={open} className="arrow-translation" />
                       <span>Search Advanced</span>
                    </SearchAdvandedContainer>
                    <AdvancedForm open={open}>
                    <Grid container spacing={24}>
                       <Grid item xs={3} sm={3}>
                        <Field
                        name="number"
                        autoFocus={true}
                        component={CustomTextField}
                        label="Number"
                        classes={{
                          underline: classes.cssUnderline
                        }}
                  />
                       </Grid>
                         <Grid item xs={3} sm={3}>
                            <Field
                          name="tech"
                          component={CustomTextField}
                          label="Technology"
                          fullWidth={true}
                         />
                       </Grid>
                       <Grid item xs={3} sm={3}>
                       <Field
                        name="tool"
                        component={CustomTextField}
                        label="Tool"
                        fullWidth={true}
                      />
                       </Grid>
                       <Grid item xs={3} sm={3}>
                       <Field
                        name="sen"
                        component={CustomTextField}
                        label="Seniority"
                        fullWidth={true}
                      />
                       </Grid>
                       <div>
                      <Button
                        type="submit"
                        disabled={pristine || submitting}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        <SearchIcon className={classes.LeftIcon} />
                        Search
                      </Button>
                    </div>
                    </Grid>
                    </AdvancedForm>
               </form>
         </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "HomeForm", // a unique identifier for this form
  validate
})(
  withStyles(styles)(
    connect(
      null,
      { SearchAction, resetForm, SearchDataAction, getLocation }
    )(Home)
  )
);
