import React, { Component } from 'react'
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components'
import { getUsers, ResetPassword } from '../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

const Div = styled.div`
    width: 95%;
    margin: 0 auto;
    padding-top: 20px;
    margin-bottom: 20px;
`


class AllUser extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            open: false,
            idSelected: '',
            password: '',
            error: '',
            columns: [
                { name: 'fullname', title: 'Fullname' },
                { name: 'email', title: 'Email' },
                { name: 'username', title: 'Username' },
                { name: 'role', title: 'Role' },
                { name: 'reset', title: 'Reset' }
            ]
        };
    }

    componentWillMount = () => {
        const { getUsers, history } = this.props
        const role = localStorage.getItem('Role')
        if(role !== 'admin') {
            history.push('/search')
        }
        getUsers()
    }

    handleReset = (id) => {
        this.setState({ idSelected: id, open: true });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleInput = (e) => {
        e.preventDefault()
        const value = e.target.value
        this.setState({
            password: value
        })
    }

    handleResetPassword = () => {
        const { idSelected, password } = this.state
        const { ResetPassword } = this.props
        const username = localStorage.getItem('Username')
        const values = {
            username: username,
            password
        }
        if(_.size(password) === 0) {
            this.setState({
                error: 'Required'
            })
        } else {
            ResetPassword(values, idSelected)
            this.setState({
                error: '',
                open: false
            })
        }
    }

    getCell = (props) => {
        if (props.column.name.includes('reset')) {
            const id = props.row._id;
            return (
                <Table.Cell>
                    <EditIcon onClick={() => this.handleReset(id)} style={{ color: '#eb2f11', fontSize: '20px' }} />
                </Table.Cell>
            )
        }
        return <Table.Cell {...props} />;
    }

    render () {
        const { columns, open, password, error } = this.state;
        const { rowsData } = this.props;
        return (
            <Div>
                <Paper>
                    <Grid
                        rows={rowsData && rowsData}
                        columns={columns}
                    >
                    <Table cellComponent={this.getCell} />
                    <TableHeaderRow />
                    </Grid>
                </Paper>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Reset Password You Need To Re-Type Your Password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name='password'
                        label="Your Password"
                        value={password}
                        onChange={(e) => this.handleInput(e)}
                        type="password"
                        fullWidth
                    />
                    { error !== 0 && <span style={{ color: 'red', fontSize: '12px' }} >{error}</span> }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleResetPassword} color="primary">
                        Reset
                    </Button>
                </DialogActions>
                </Dialog>
            </Div>
        )
    }
}

function mapStateToProps({ searchState }) {
    return {
      rowsData: searchState.users
    }
}

export default connect(mapStateToProps, { getUsers, ResetPassword })(AllUser)