import React, {Component} from 'react'
import { connect } from "react-redux";
import { SearchAction, resetForm } from '../actions'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {
    Grid,
    Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField
} from 'redux-form-material-ui'

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
    fab: {
        margin: theme.spacing.unit,
        backgroundColor: '#eb2f11',
        position: 'absolute',
        bottom: '25px',
        right: '30px',
        '&:hover': {
            backgroundColor: '#eb2f11',
        }
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
      'term'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    return errors
}

class Home extends Component {

    onSubmit = (values) => {
        const { SearchAction, history } = this.props
        SearchAction(values);
        history.push('/search-result')
    }

    addProfile = () => {
        const { history, resetForm } = this.props
        history.push('/add-profile')
        resetForm()
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
                    <form onSubmit={handleSubmit(this.onSubmit)} className={classes.form} >
                        <div>
                            <Field
                                name="term"
                                autoFocus={true}
                                component={TextField}
                                hintText="What are you searching for"
                                floatingLabelText="Search (*)"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="tech"
                                component={TextField}
                                hintText="Add technology here"
                                floatingLabelText="Technology"
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <Field
                                name="tool"
                                component={TextField}
                                hintText="Add tool here"
                                floatingLabelText="Tool"
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <Field
                                name="seniority"
                                component={TextField}
                                hintText="Add seniority here"
                                floatingLabelText="Seniority"
                                fullWidth={true}
                            />
                        </div>
    
                        <div>
                            <Button type='submit' disabled={pristine || submitting} variant="contained" color="primary" className={classes.button}>
                                <SearchIcon className={classes.LeftIcon} />
                                Search
                            </Button>
                        </div>
                    </form>
                </Grid>
                <Tooltip title='Add Profile' >
                    <Fab color="primary" onClick={this.addProfile} aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default reduxForm({
    form: 'HomeForm', // a unique identifier for this form
    validate
})(withStyles(styles)(connect(null, { SearchAction, resetForm })(Home)))