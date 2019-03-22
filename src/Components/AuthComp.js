import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
var Token = localStorage.getItem("Token");

class AuthComp extends Component {
    componentDidMount() {
        const { user } = this.props;
        if (!user && !Token) {
            this.props.history.push('/');
        }
    }
    componentDidUpdate() {
        const { user } = this.props;
        if (!user && !Token) {
            this.props.history.push('/');
        }
    }
    render() {
        const { children, user } = this.props;
        return (Token || user) ? <div>{children}</div> : null
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.userCur
    }
}

export default withRouter(connect(mapStateToProps)(AuthComp));