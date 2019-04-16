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

const renderTaches = ({ fields, classes }) => (
  <React.Fragment>
    {fields.length !== 0 && (
      <ExpansionPanel className={classes.header}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Taches ({fields.length}){" "}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.body}>
          {fields.map((taches, index) => (
            <Paper key={index} className="paper-card" elevation={1}>
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <Field
                    name={`${taches}.titre`}
                    component={CustomTextField}
                    fullWidth={true}
                    hintText="Tache..."
                    label="Tache"
                  />
                </Grid>
                <Grid item xs={2} className="iconDiv">
                  <Tooltip title="Suprimer Une Tache">
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
      variant="outlined"
      className="add-button-child"
      onClick={() => fields.push({})}
    >
      Ajouter Une Nouvelle Tache
    </Button>
  </React.Fragment>
);

renderTaches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(renderTaches);
