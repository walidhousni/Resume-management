import React, { Component } from 'react'
import MaltemForm from './MaltemForm'
import MaltemViewer from './MaltemViewer'
import styled from 'styled-components'
import { GetProfileAction, getLocation } from '../../actions'
import { connect } from "react-redux";
import _ from 'lodash'

const Div = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 64px);
`

class MaltemCv extends Component {
    componentWillMount = () => {
        const { match, GetProfileAction, history, getLocation } = this.props
        if(match.params.id){
            GetProfileAction(match.params.id)
        } else {
            console.log(this.props)
        }
        const path = _.split(history.location.pathname, '/')[1]
        getLocation(path)
    }

    render () {
        const { match } = this.props
        return (
            <Div>
                <MaltemForm match={match} />
                <MaltemViewer />
            </Div>
        )
    }
}

export default connect(null, { GetProfileAction, getLocation })(MaltemCv);