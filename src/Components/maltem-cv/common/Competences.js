import React from "react";
import { Grid, Button, Paper, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Field } from "redux-form";
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

const renderCompetences = ({ fields, disabled, match, classes }) => (
  <React.Fragment>
    {fields.length !== 0 && (
      <ExpansionPanel className={classes.header}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Competences ({fields.length}){" "}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.body}>
          {fields.map((competence, index) => (
            <Paper key={index} className="paper-card" elevation={1}>
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <Field
                    name={`${competence}.titre`}
                    component={CustomTextField}
                    fullWidth={true}
                    hintText="Ex: Front..."
                    label="Titre"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name={`${competence}.description`}
                    component={CustomTextField}
                    multiLine={true}
                    fullWidth={true}
                    hintText="Description..."
                    label="Description"
                  />
                </Grid>
                <Grid item xs={2} className="iconDiv">
                  <Tooltip title="Suprimer Une Compétence">
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
      Ajouter Une Nouvelle Compétence
    </Button>
  </React.Fragment>
);

renderCompetences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(renderCompetences);
