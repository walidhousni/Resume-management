import React, { Component } from "react";
import { Grid, Paper, Switch } from "@material-ui/core";
import { Field } from "redux-form";

import CustomTextField from "../../common/CustomTextField";

class RenderInfosPerso extends Component {
  handleShowCode = name => {
    const { showCode } = this.props;
    showCode(name);
  };

  render() {
    const { value } = this.props;
    return (
      <Paper className="paper-card" elevation={1}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Field
              name="nom"
              component={CustomTextField}
              fullWidth={true}
              hintText="Nom..."
              label="Nom"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="annee"
              component={CustomTextField}
              fullWidth={true}
              hintText="Année d'experience..."
              label="Année d'experience"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="status"
              component={CustomTextField}
              fullWidth={true}
              hintText="Status..."
              label="Status"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="number"
              component={CustomTextField}
              disabled={true}
              fullWidth={true}
              hintText="Code..."
              label="Code"
            />
          </Grid>
          <Grid item xs={2} style={{ marginTop: 24 }}>
            <Switch
              checked={value}
              onChange={() => this.handleShowCode(!value)}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default RenderInfosPerso;
