import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field, FieldArray } from "redux-form";
import renderTaches from './Taches'

const renderMissions = ({ fields }) => (
    <React.Fragment>
        {
            fields.map((mission, index) => (
                <Paper className='paper-card' elevation={1}>
                    <Grid container spacing={24} key={index} >
                        <Grid item xs={5}>
                            <Field
                                name={`${mission}.titre`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Mission..."
                                floatingLabelText="Mission"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Field
                                name={`${mission}.description`}
                                component={TextField}
                                multiLine={true}
                                fullWidth={true}
                                hintText="Description..."
                                floatingLabelText="Description"
                            />
                        </Grid>
                        <Grid item xs={2} className='iconDiv' >
                            <Tooltip title="Suprimer Une Mission">
                                <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <FieldArray name={`${mission}.taches`} component={renderTaches}/>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        }
        <Button variant="outlined" className='add-button-child' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Mission
        </Button>
    </React.Fragment>
)

export default renderMissions;