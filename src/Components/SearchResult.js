import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableComponent from './common/Table'
import { SearchAction, getLocation } from '../actions'
import _ from 'lodash'
import { toast } from 'react-toastify';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    div: {
        height: '80vh',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    table: {
        width: '95%',
        marginTop: 10
    }
});

class SearchResult extends Component {
    componentWillMount = () => {
        const { data, SearchAction, history, getLocation } = this.props
        if(!_.isEmpty(data && data)){
            SearchAction(data)
        } else {
            history.push('/')
        }
        const path = _.split(history.location.pathname, '/')[1]
        getLocation(path)
    }

    componentDidUpdate = () => {
        const { result, error, history } = this.props
        console.log('lol')
        if(_.isEmpty(result) && error !== ""){
            history.push('/')
            toast.error(error, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        } 
    }

    render () {
        const { result, classes } = this.props;
        return (
            <div className={classes.root}>
                {
                    result && result.length !== 0 ?
                    <TableComponent styleClass={classes.table} rowsData={result} />
                    :
                    <div className={classes.div} >
                        <Spinner name="chasing-dots" color="#d81b60"/>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        result: state.searchState.search,
        data: state.searchState.searchData,
        error: state.searchState.error
    }
}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, { SearchAction, getLocation })(SearchResult))