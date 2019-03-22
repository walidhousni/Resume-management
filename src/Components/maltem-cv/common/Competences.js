import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field } from "redux-form";

const renderCompetences = ({ fields, disabled, match }) => (
    <React.Fragment>
        {
            fields.map((competence, index) => (
                <Paper className='paper-card' elevation={1}>
                    <Grid container spacing={24} key={index} >
                        <Grid item xs={5}>
                            <Field
                                name={`${competence}.titre`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Ex: Front..."
                                floatingLabelText="Titre"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Field
                                name={`${competence}.description`}
                                component={TextField}
                                multiLine={true}
                                fullWidth={true}
                                hintText="Description..."
                                floatingLabelText="Description"
                            />
                        </Grid>
                        <Grid item xs={2} className='iconDiv' >
                            <Tooltip title="Suprimer Une Compétence">
                                <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        }
        <Button disabled={match ? match.path === '/add-profile' && disabled : false} variant="outlined" className='add-button' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Compétence
        </Button>
    </React.Fragment>
)

export default renderCompetences;