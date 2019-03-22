import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field } from "redux-form";

const renderLangues = ({ fields, disabled, match }) => (
    <React.Fragment>
            {
                fields.map((langue, index) => (
                    <Paper className='paper-card' elevation={1}>
                        <Grid container spacing={24} key={index} >
                            <Grid item xs={5}>
                                <Field
                                    name={`${langue}.langue`}
                                    component={TextField}
                                    fullWidth={true}
                                    hintText="langue..."
                                    floatingLabelText="Langue"
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Field
                                    name={`${langue}.niveau`}
                                    component={TextField}
                                    multiLine={true}
                                    fullWidth={true}
                                    hintText="Niveau De Langue..."
                                    floatingLabelText="Niveau"
                                />
                            </Grid>
                            <Grid item xs={2} className='iconDiv' >
                                <Tooltip title="Suprimer Une Langue">
                                    <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            }
        <Button disabled={match ? match.path === '/add-profile' && disabled : false} variant="outlined" className='add-button' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Langue
        </Button>
    </React.Fragment>
)

export default renderLangues;