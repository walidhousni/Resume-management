import React, { Component } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import DropzoneWithPreview  from './DropzoneWithPreview'
import {
    Grid,
    Button
} from '@material-ui/core';
import Add from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField
} from 'redux-form-material-ui'
import { UploadFileAction } from '../../actions'
import renderCompetences from '../maltem-cv/common/Competences'
import renderEducations from '../maltem-cv/common/Educations'
import renderLangues from '../maltem-cv/common/Langues'
import renderExperiences from '../maltem-cv/common/Experiences'
import styled from 'styled-components'

const styles = theme => ({
    cssFocused: {
        '&$cssFocused': {
            color: 'green',
        },
    },
    form: {
        marginTop: 50,
        width: '90%'
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
    const errors = {}
    const requiredFields = [
        'nom',
        'age',
        'phone'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class Profile extends Component {
    handleFileChange = files => {
        const file = files[0];
        UploadFileAction(file);
    };

    render() {
        const { handleSubmit, onSubmit, submitting, classes, match, pdfContent } = this.props;
        return (
            <AddForm onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Grid container spacing={24} >
                <Grid item xs={6} >
                    <Grid container spacing={24} >
                        <Grid item xs={3}>
                            <Field
                                name="nom"
                                disabled={!match.params.id && !pdfContent}
                                autoFocus={true}
                                component={TextField}
                                hintText="Enter Name"
                                floatingLabelText="Name *"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="age"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter Age"
                                floatingLabelText="Age"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="phone"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter Phone"
                                floatingLabelText="Phone"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                            name="mail"
                            disabled={!match.params.id && !pdfContent}
                            component={TextField}
                            hintText="Enter Mail"
                            floatingLabelText="Mail"
                            fullWidth={true}
                            classes={{
                                underline: classes.cssUnderline
                            }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="city"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter candidate's city"
                                floatingLabelText="City"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="job"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter a job title"
                                floatingLabelText="Job Title"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="secteur"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Ex: Banque, Assurance, Transport ..."
                                floatingLabelText="Activity"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="network"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter The Network"
                                floatingLabelText="Network"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="seniority"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter the seniority"
                                floatingLabelText="Seniority"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="experience"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Number of years of experience"
                                floatingLabelText="Experience"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="mobility"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Use , to separate values"
                                floatingLabelText="Mobility"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="contract"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Ex: Freelance, CDI, CDD ..."
                                floatingLabelText="Contract Type"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="tools"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Use , to separate values (Python, PHP)"
                                floatingLabelText="Tools"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                             />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="technology"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Use , to separate values (Mobile, Data)"
                                floatingLabelText="Technology"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="disponibility"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter disponibility"
                                floatingLabelText="Disponibility"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="salary"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Enter the minimum salary requirement"
                                floatingLabelText="Salary"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="description"
                                disabled={!match.params.id && !pdfContent}
                                component={TextField}
                                hintText="Add a description"
                                floatingLabelText="Description"
                                fullWidth={true}
                                classes={{
                                    underline: classes.cssUnderline
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <FieldArray disabled={!match.params.id && !pdfContent} match={match} name="competences" component={renderCompetences}/>
                        </Grid>
                        <Grid item xs={12} >
                            <FieldArray disabled={!match.params.id && !pdfContent} match={match} name="educations" component={renderEducations}/>
                        </Grid>
                        <Grid item xs={12} >
                            <FieldArray disabled={!match.params.id && !pdfContent} match={match} name="langues" component={renderLangues}/>
                        </Grid>
                        <Grid item xs={12} >
                            <FieldArray disabled={!match.params.id && !pdfContent} match={match} name="experiences" component={renderExperiences}/>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={5}>
                            <div>
                                <Button type='submit' disabled={!match.params.id && !pdfContent} variant="contained" color="primary" className={classes.button}>
                                        <Add className={classes.LeftIcon} />
                                             Add Profile
                                 </Button>
                             </div>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    !match.params.id &&
                    <Grid item xs={6} >
                        <Grid container spacing={24} >
                            <Grid item xs={12}>
                                {!match.params.id && <DropzoneWithPreview onFileChange={this.handleFileChange} />}
                            </Grid>
                        </Grid>
                    </Grid>
                }
              </Grid>
    </AddForm>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, props) {
    return props.match.params.id ?
    {
        initialValues: { ...state.profileState.profieSelected }
    }
    : 
    {
        initialValues: {...state.profileState.uploadFileStatus},
        pdfContent: state.profileState.uploadFileStatus
    }
}

export default compose(
    connect(mapStateToProps, { UploadFileAction }),
    reduxForm({
        form: 'ProfileForm', enableReinitialize: true,
        destroyOnUnmount: false,
        validate
    })
)(withStyles(styles)(Profile));
