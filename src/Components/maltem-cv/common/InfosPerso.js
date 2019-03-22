import React, { Component } from 'react'
import { Grid, Paper, Switch } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";
import { Field } from "redux-form";

class RenderInfosPerso extends Component {
    handleShowCode = name => {
        const { showCode } = this.props
        showCode(name)
    }

    render() {
        const { value } = this.props
        return(
            <Paper className='paper-card' elevation={1}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Field
                            name="nom"
                            component={TextField}
                            fullWidth={true}
                            hintText="Nom..."
                            floatingLabelText="Nom"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="annee"
                            component={TextField}
                            fullWidth={true}
                            hintText="Année d'experience..."
                            floatingLabelText="Année d'experience"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="status"
                            component={TextField}
                            fullWidth={true}
                            hintText="Status..."
                            floatingLabelText="Status"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="number"
                            component={TextField}
                            disabled={true}
                            fullWidth={true}
                            hintText="Code..."
                            floatingLabelText="Code"
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: 24 }} >
                        <Switch
                            checked={value}
                            onChange={() => this.handleShowCode(!value)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default RenderInfosPerso