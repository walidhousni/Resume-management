import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import {
  GetProfileAction,
  GetSelectedNote,
  CloseEditable,
  AddNote,
  EditNote,
  getLocation
} from "../actions";
import Spinner from "react-spinkit";
import _ from "lodash";
import styled from "styled-components";
import { Paper, Chip, Avatar, Button } from "@material-ui/core";
import Profile from "../static/profile.jpg";
import ScoreRadar from "./common/ScoreRadar";
import { TextField } from "redux-form-material-ui";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import moment from "moment";
import { toast } from "react-toastify";

const Div = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .left-side {
    width: 69%;
  }

  .right-side {
    width: 30%;
  }

  .nom {
    font-weight: bold;
    font-family: helvetica;
  }

  .title {
    font-family: Helvetica;
    font-weight: bold;
    color: grey;
  }

  .title-sub {
    font-family: Helvetica;
    font-weight: bold;
    color: #b7b6b6;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 9px;
  }

  .cree-par {
    font-family: helvetica;
    color: grey;
    font-size: 13px;
  }

  .header {
    margin-top: 30px;
    padding: 20px;
    display: flex;
  }

  .notes {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .note {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .avatar {
    font-size: 14px;
  }

  .note-body {
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    width: 100%;
  }

  .edit-note {
    display: flex;
    justify-content: space-between;
  }

  svg {
    font-size: 19px;
    cursor: pointer;
  }

  .user {
    font-family: helvetica;
    font-weight: bold;
    font-size: 13px;
    text-transform: capitalize;
  }

  .date {
    font-family: helvetica;
    font-weight: bold;
    font-size: 10px;
    color: gray;
    margin-right: 5px;
  }

  .comment {
    margin-top: 5px;
    font-family: helvetica;
    font-size: 16px;
    color: #7b7979;
    font-weight: bold;
  }

  .infos {
    width: 45%;
    padding: 20px;
  }

  .score {
    width: 45%;
    padding: 20px;
  }

  .body {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }

  .div-chip {
    display: flex;
    flex-direction: column;
  }

  .profile-pic {
    width: 100px;
    height: 100px;
  }

  .score-radar {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .chip {
    margin-right: 3px;
    margin-top: 2px;
  }

  .seniority {
    align-self: flex-start;
    font-family: Helvetica;
    font-weight: bold;
    color: #b7b6b6;
    font-size: 12px;
    margin-top: 17px;
    text-transform: capitalize;
  }

  .icon-div {
    display: flex;
    justify-content: space-between;
  }

  .time_div {
    display: flex;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding-top: 17px;
  flex: 1;
`;

const DivSpinner = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ShowProfile extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.profile.notes !== nextProps.profile.notes) {
      // Check if it's a new user, you can also use some unique property, like the ID
      this.props.GetProfileAction(this.props.match.params.id);
    }
  }

  componentWillMount = () => {
    const { GetProfileAction, match, getLocation, history } = this.props;
    if (match.params.id) {
      GetProfileAction(this.props.match.params.id);
    }
    const path = _.split(history.location.pathname, "/")[1];
    getLocation(path);
  };

  handleNote = (comment, id) => {
    const { GetSelectedNote } = this.props;
    GetSelectedNote(comment, id);
  };

  onSubmit = ({ comment, add_note, note_id }) => {
    const {
      CloseEditable,
      isEditable,
      reset,
      AddNote,
      EditNote,
      match
    } = this.props;
    const profileId = match.params.id;
    const username = localStorage.getItem("Username");
    const date = moment().format("HH:mm DD-MM-YYYY");
    const updated_at = moment().format("HH:mm DD-MM-YYYY");
    if (add_note) {
      const note = { created_by: username, comment: add_note, date };
      AddNote(note, profileId);
      toast.success("Note Added Successfully!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      reset();
    } else if (comment && note_id) {
      const note = { created_by: username, comment, updated_at };
      EditNote(note, note_id, profileId);
      toast.success("Note Updated Successfully!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      CloseEditable(!isEditable);
    }
  };

  render() {
    const {
      profile,
      isEditable,
      noteId,
      handleSubmit,
      CloseEditable
    } = this.props;
    const role = localStorage.getItem("Role");
    const username = localStorage.getItem("Username");
    // const profile = {}
    const status = _.isEmpty(profile);
    if (profile && !status) {
      const technology = _.split(profile.technology, ",");
      const tools = _.split(profile.tools, ",");
      return (
        <Div>
          <div className="left-side">
            <Paper className="header">
              <img src={Profile} alt="profile" className="profile-pic" />
              <Infos>
                <span className="nom">{profile.nom}</span>
                <span className="cree-par">Crée par: {profile.created_by}</span>
              </Infos>
              <span className="seniority">{profile.seniority}</span>
            </Paper>
            <div className="body">
              <Paper className="infos">
                <span className="title">Infos: </span>
                <div className="div-chip">
                  <span className="title-sub">Technology: </span>
                  <div>
                    {technology.map((tech, idx) => (
                      <Chip key={idx} label={tech} className="chip" />
                    ))}
                  </div>
                </div>
                <div className="div-chip">
                  <span className="title-sub">Tools: </span>
                  <div>
                    {tools.map((tool, idx) => (
                      <Chip key={idx} label={tool} className="chip" />
                    ))}
                  </div>
                </div>
              </Paper>
              <Paper className="score">
                <span className="title">Score: </span>
                <ScoreRadar score={profile.scoring} />
              </Paper>
            </div>
          </div>
          <div className="right-side">
            <Paper className="notes">
              <span className="title">Notes: </span>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                {profile.notes.map((note, idx) => (
                  <div className="note" key={idx}>
                    <Avatar className="avatar">
                      {note.created_by.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="note-body">
                      <span className="user">{note.created_by}</span>
                      <div className="time_div">
                        <span className="date">{note.date}</span>
                        <span className="date">
                          {note.updated_at != "" &&
                            `Updated at: ${note.updated_at}`}
                        </span>
                      </div>

                      {isEditable && note._id === noteId ? (
                        <div>
                          <Field
                            name="comment"
                            component={TextField}
                            fullWidth={true}
                          />
                          <Field
                            name="note_id"
                            component={TextField}
                            fullWidth={true}
                            type="hidden"
                            style={{ display: "none" }}
                          />
                          <div className="icon-div">
                            <Button type="submit">
                              <DoneIcon
                                type="submit"
                                style={{ color: "#11eb5e" }}
                              />
                            </Button>
                            <Button>
                              <CloseIcon
                                style={{ color: "#eb2f11" }}
                                onClick={() => CloseEditable(!isEditable)}
                              />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="edit-note">
                          <p className="comment">{note.comment}</p>
                          {role === "admin" ? (
                            <EditIcon
                              color="primary"
                              onClick={() =>
                                this.handleNote(note.comment, note._id)
                              }
                            />
                          ) : (
                            role === "rh" &&
                            username === note.created_by && (
                              <EditIcon
                                color="primary"
                                onClick={() =>
                                  this.handleNote(note.comment, note._id)
                                }
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {role !== "com" && (
                  <Field
                    name="add_note"
                    component={TextField}
                    fullWidth={true}
                    hintText="Add New Note"
                    label="Add New Note"
                  />
                )}
              </form>
            </Paper>
          </div>
        </Div>
      );
    } else {
      return (
        <DivSpinner>
          <Spinner name="pacman" color="#eb2f11" />
        </DivSpinner>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profileState.profieSelected,
    isEditable: state.profileState.isEditable,
    noteId: state.profileState.selectedNote.id,
    initialValues: state.profileState.selectedNote && {
      comment: state.profileState.selectedNote.comment,
      note_id: state.profileState.selectedNote.id
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      GetProfileAction,
      GetSelectedNote,
      CloseEditable,
      AddNote,
      EditNote,
      getLocation
    }
  ),
  reduxForm({
    form: "EditOrCreateNote",
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(ShowProfile);
