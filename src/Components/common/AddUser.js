import React, { Component } from 'react'
import Register from './Register'
import { getParams } from '../../actions'
import { connect } from 'react-redux'

class AddUser extends Component {
    componentWillMount = () => {
        const { getParams, history } = this.props
        const role = localStorage.getItem('Role')
        if(role !== 'admin') {
            history.push('/search')
        }
        getParams()
    }
    render () {
        const { params, history } = this.props
        return (
            <div>
                <Register history={history && history} params={params && params} />
            </div>
        )
    }
}

function mapStateToProps({ searchState }) {
    return {
      params: searchState.params
    }
}

export default connect(mapStateToProps, { getParams })(AddUser)