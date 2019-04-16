import React from "react";
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Field, FieldArray } from "redux-form";
import renderMissions from "./Missions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CustomTextField from "../../common/CustomTextField";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  body: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    marginBottom: "20px"
  }
});

const renderExperiences = ({ fields, disabled, match, classes }) => (
  <React.Fragment>
    {fields.length !== 0 && (
      <ExpansionPanel className={classes.header}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Experiences ({fields.length}){" "}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.body}>
          {fields.map((experience, index) => (
            <Paper key={index} className="paper-card" elevation={1}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <Field
                    name={`${experience}.annee`}
                    component={CustomTextField}
                    fullWidth={true}
                    hintText="Année"
                    label="Année"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name={`${experience}.entreprise`}
                    component={CustomTextField}
                    fullWidth={true}
                    hintText="Nom de l'entreprise..."
                    label="Entreprise"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name={`${experience}.fonction`}
                    component={CustomTextField}
                    fullWidth={true}
                    hintText="Fonction..."
                    label="Fonction"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name={`${experience}.missions`}
                    component={renderMissions}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Field
                    name={`${experience}.environnement`}
                    component={CustomTextField}
                    multiLine={true}
                    fullWidth={true}
                    hintText="Environnement Technique..."
                    label="Environnement Technique"
                  />
                </Grid>
                <Grid item xs={2} className="iconDiv">
                  <Tooltip title="Suprimer Une Experience">
                    <DeleteIcon
                      onClick={() => fields.remove(index)}
                      className="icon"
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )}
    <Button
      disabled={match ? match.path === "/add-profile" && disabled : false}
      variant="outlined"
      className="add-button"
      onClick={() => fields.push({})}
    >
      Ajouter Une Nouvelle Experience
    </Button>
  </React.Fragment>
);

renderExperiences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(renderExperiences);
