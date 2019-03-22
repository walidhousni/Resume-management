import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field } from "redux-form";

const renderEducations = ({ fields, disabled, match }) => (
    <React.Fragment>
        {
            fields.map((education, index) => (
                <Paper className='paper-card' elevation={1}>
                    <Grid container spacing={24} key={index} >
                        <Grid item xs={5}>
                            <Field
                                name={`${education}.annee`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Date d'étude"
                                floatingLabelText="Année"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Field
                                name={`${education}.description`}
                                component={TextField}
                                multiLine={true}
                                fullWidth={true}
                                hintText="Description..."
                                floatingLabelText="Description"
                            />
                        </Grid>
                        <Grid item xs={2} className='iconDiv' >
                            <Tooltip title="Suprimer Une Case D'éducation">
                                <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        }
        <Button disabled={match ? match.path === '/add-profile' && disabled : false} variant="outlined" className='add-button' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Case D'éducation
        </Button>
    </React.Fragment>
)

export default renderEducations;