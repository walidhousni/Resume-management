import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableComponent from './common/Table'

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

    render () {
        const { result, classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    result && result.length ?
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

function mapStateToProps({ searchState }){
    return {
        result: searchState.search,
    }
}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(SearchResult))