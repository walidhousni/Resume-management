import React from 'react'
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import DeleteIcon from '@material-ui/icons/Delete';
import { Field } from "redux-form";

const renderTaches = ({ fields }) => (
    <React.Fragment>
        {
            fields.map((taches, index) => (
                <Paper className='paper-card' elevation={1}>
                    <Grid container spacing={24} key={index} >
                        <Grid item xs={10}>
                            <Field
                                name={`${taches}.titre`}
                                component={TextField}
                                fullWidth={true}
                                hintText="Tache..."
                                floatingLabelText="Tache"
                            />
                        </Grid>
                        <Grid item xs={2} className='iconDiv' >
                            <Tooltip title="Suprimer Une Tache">
                                <DeleteIcon onClick={() => fields.remove(index)} className='icon' />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        }
        <Button variant="outlined" className='add-button-child' onClick={() => fields.push({})}>
            Ajouter Une Nouvelle Tache
        </Button>
    </React.Fragment>
)

export default renderTaches