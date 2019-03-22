import React from 'react';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import PrintIcon from '@material-ui/icons/Print'
import PdfIcon from '@material-ui/icons/PictureAsPdf'
import ShowIcon from '@material-ui/icons/RemoveRedEye'
import Tooltip from '@material-ui/core/Tooltip';
import {
  // State or Local Processing Plugins
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';

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
      ]
    };

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };
  }

  getCell = (props) => {
    if (props.column.name.includes('edit')) {
        const id = props.row.id;
        const link = props.row.link;
        return (<>
            <Table.Cell>
                <Link to={`/edit-profile/${id}`} ><Tooltip title='Edit Profile' ><EditIcon style={{ color: '#eb2f11', fontSize: '20px' }} /></Tooltip></Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/maltem-cv/${id}`} ><Tooltip title='Maltemisation' ><PrintIcon style={{ color: '#eb2f11', fontSize: '20px' }} /></Tooltip></Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/profile/${id}`} ><Tooltip title='Show Profile' ><ShowIcon style={{ color: '#eb2f11', fontSize: '20px' }} /></Tooltip></Link>
            </Table.Cell>
            <Table.Cell>
                <a href={`http://localhost:4000/${link}`} target="_blank" ><Tooltip title='Show PDF'><PdfIcon style={{ color: '#eb2f11', fontSize: '20px' }} /></Tooltip></a>
            </Table.Cell></>  
        )
    }
    return <Table.Cell {...props} />;
  }

  render() {
    const { columns, columnWidths } = this.state;
    const { styleClass, rowsData } = this.props;
    return (
      <Paper className={styleClass} >
        <Grid
          rows={rowsData.map(hit => _.assign(hit._source, { id: hit._id }))}
          columns={columns}
        >
          <FilteringState columnExtensions={[
            { columnName: 'edit', filteringEnabled: false },
            { columnName: 'maltemisation', filteringEnabled: false },
            { columnName: 'pdf', filteringEnabled: false },
            { columnName: 'show', filteringEnabled: false }
          ]} defaultFilters={[]} />
          <IntegratedFiltering />
          <SortingState
            columnExtensions={[
              { columnName: 'edit', sortingEnabled: false },
              { columnName: 'maltemisation', sortingEnabled: false },
              { columnName: 'pdf', sortingEnabled: false },
              { columnName: 'show', sortingEnabled: false }
            ]}
            defaultSorting={[
              { columnName: 'name', direction: 'asc' },
              { columnName: 'age', direction: 'asc' },
              { columnName: 'experience', direction: 'asc' },
              { columnName: 'technology', direction: 'asc' },
              { columnName: 'tools', direction: 'asc' },
              { columnName: 'seniority', direction: 'asc' },
              { columnName: 'disponibility', direction: 'asc' },
              { columnName: 'salary', direction: 'asc' }
            ]}
          />
          <IntegratedSorting />
          <Table cellComponent={this.getCell} />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />
        </Grid>
      </Paper>
    );
  }
}

export default TableComponent;