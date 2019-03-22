import React, { Component } from 'react'
import MaltemForm from './MaltemForm'
import MaltemViewer from './MaltemViewer'
import styled from 'styled-components'
import { GetProfileAction } from '../../actions'
import { connect } from "react-redux";

const Div = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 64px);
`

class MaltemCv extends Component {
    componentWillMount = () => {
        const { match, GetProfileAction } = this.props
        if(match.params.id){
            GetProfileAction(match.params.id)
            console.log(this.props)
        } else {
            console.log(this.props)
        }
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

export default connect(null, { GetProfileAction })(MaltemCv);