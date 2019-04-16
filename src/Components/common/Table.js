import React, { Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});


class TablePaginationActions extends React.Component {
     handleBackButtonClick = event => {
       this.props.onChangePage(event, 0);
     };

     handleNextButtonClick = event => {
       this.props.onChangePage(event, this.props.page + 1)
     };

     render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
        
      return (
        <div className={classes.root} >
          <IconButton 
            onClick={this.handleBackButtonClick}
            disable={page === 0}
            aria-label = "Previous Page"
          >
           {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        </div>
      )
     }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TableComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        columns: [
          { name: 'name', title: 'Name' },
          { name: 'age', title: 'Age' },
          { name: 'experience', title: 'Experience' },
          { name: 'technology', title: 'Technology' },
          { name: 'tools', title: 'Tools' },
          { name: 'seniority', title: 'Seniority' },
          { name: 'disponibility', title: 'Disponibility' },
          { name: 'salary', title: 'Salary' },
          { name: 'edit', title: '  ' },
          { name: 'maltemisation', title: ' ' },
          { name: 'show', title: ' ' },
          { name: 'pdf', title: ' ' }
        ],
        columnWidths: [
          { columnName: 'name', width: 150 },
          { columnName: 'age', width: 80 },
          { columnName: 'experience', width: 100 },
          { columnName: 'technology', width: 240 },
          { columnName: 'tools', width: 200 },
          { columnName: 'seniority', width: 100 },
          { columnName: 'disponibility', width: 100 },
          { columnName: 'salary', width: 120 },
          { columnName: 'edit', width: 50 },
          { columnName: 'maltemisation', width: 50 },
          { columnName: 'show', width: 50 },
          { columnName: 'pdf', width: 50 }
        ],
        page: 0,
        rowsPerPage: 5
      };
    }

    handleChangePage = (event, page) => {
      this.setState({page});
    };

    handleChangeRowsPerPage = event => {
      this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
      const { classes } = this.props;
      const { rows, rowsPerPage, page } = this.state;

      return (
        <Fragment className={classes.root}>
        <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                 <TableBody>
                     <TableRow>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                       <TableCell component="th" scope="row">
                           hey
                       </TableCell>
                     </TableRow>
                 </TableBody>
                </Table>
          </div>
        </Fragment>
      
      )
    }
}



export default withStyles(styles)(TableComponent);