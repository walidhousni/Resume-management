import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field, FieldArray } from "redux-form";
import renderMissions from './Missions'

const renderExperiences = ({ fields, disabled, match }) => (
    <React.Fragment>
        {
            fields.map((experience, index) => (
                <Paper className='paper-card' elevation={1}>
                    <Grid container spacing={24} key={index} >
                        <Grid item xs={4}>
                            <Field
                                name={`${experience}.annee`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Année"
                                floatingLabelText="Année"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                name={`${experience}.entreprise`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Nom de l'entreprise..."
                                floatingLabelText="Entreprise"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                name={`${experience}.fonction`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Fonction..."
                                floatingLabelText="Fonction"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FieldArray name={`${experience}.missions`} component={renderMissions}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Field
                                name={`${experience}.environnement`}
                                component={TextField}
                                multiLine={true}
                                fullWidth={true}
                                hintText="Environnement Technique..."
                                floatingLabelText="Environnement Technique"
                            />
                        </Grid>
                        <Grid item xs={2} className='iconDiv' >
                            <Tooltip title="Suprimer Une Experience">
                                <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        }
        <Button disabled={match ? match.path === '/add-profile' && disabled : false} variant="outlined" className='add-button' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Experience
        </Button>
    </React.Fragment>
);

export default renderExperiences;