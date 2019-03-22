import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetProfileAction } from '../actions'
import Spinner from 'react-spinkit'
import _ from 'lodash'
import styled from 'styled-components'
import { Paper, Chip, Avatar } from '@material-ui/core'
import Profile from '../static/profile.jpg'
import ScoreRadar from './common/ScoreRadar'

const Div = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .left-side {
        width: 69%
    }

    .right-side {
        width: 30%
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
`

const Infos = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    padding-top: 17px;
    flex: 1;
`

class ShowProfile extends Component {
    componentWillMount = () => {
        const { GetProfileAction, match } = this.props;
        if(match.params.id){
            GetProfileAction(this.props.match.params.id)
        }
    }

    render () {
        const { profile } = this.props
        console.log(profile)
        // const profile = {}
        const status = _.isEmpty(profile)
        if(profile && !status) {
            const technology = _.split(profile.technology, ',')
            const tools = _.split(profile.tools, ',')
            return(
                <Div>
                    <div className='left-side' >
                        <Paper className='header' >
                            <img src={Profile} alt='profile' className='profile-pic' />
                            <Infos>
                                <span className='nom' >{profile.nom}</span>
                                <span className='cree-par' >Crée par: {profile.created_by}</span>
                            </Infos>
                            <span className='seniority' >{profile.seniority}</span>
                        </Paper>
                        <div className='body' >
                            <Paper className='infos' >
                                <span className='title' >Infos: </span>
                                <div className='div-chip' >
                                    <span className='title-sub' >Technology: </span>
                                    <div>
                                        {
                                            technology.map((tech, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={tech}
                                                    className='chip'
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='div-chip' >
                                    <span className='title-sub' >Tools: </span>
                                    <div>
                                        {
                                            tools.map((tool, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={tool}
                                                    className='chip'
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </Paper>
                            <Paper className='score' >
                                <span className='title' >Score: </span>
                                <ScoreRadar score={profile.score} />
                            </Paper>
                        </div>
                    </div>
                    <div className='right-side' >
                        <Paper className='notes' >
                            <span className='title' >Notes: </span>
                            {
                                profile.notes.map((note, idx) => (
                                    <div className='note' key={idx} >
                                        <Avatar className='avatar' >{note.created_by.charAt(0).toUpperCase()}</Avatar>
                                        <div className='note-body' >
                                            <span className='user' >{note.created_by}</span>
                                            <span className='date' >{note.date}</span>
                                            <p className='comment' >{note.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </Paper>
                    </div>
                </Div>
            )
        }else {
            return <Spinner name="pacman" color="purple"/>
        }
    }
}

const mapStateToProps = ({ profileState }) => ({
    profile: profileState.profieSelected
})

export default connect(mapStateToProps, { GetProfileAction })(ShowProfile)