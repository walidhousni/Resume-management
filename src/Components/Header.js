import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogOut from '@material-ui/icons/ExitToApp'
import Profile from '@material-ui/icons/AccountCircle'
import Search from '@material-ui/icons/Search'
import Person from '@material-ui/icons/Person'
import Dashboard from '@material-ui/icons/Dashboard'
import Back from '@material-ui/icons/KeyboardBackspace'
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Button } from '@material-ui/core';
import _ from 'lodash';
import { SeekerBrand } from './common/icons';
import Container from './common/content/Container';
var Token = localStorage.getItem("Token");

const styles = {
  root: {
    flexGrow: 1,
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  icon: {
    marginLeft: '20px',
    fontSize: '25px',
    cursor: 'pointer'
  },
  icon2: {
    marginRight: '5px',
    fontSize: '22px'
  },
  button: {
    padding: '0px !important',
    color: 'white !important',
    minHeight: '0px !important',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0) !important'
    }
  },
  logo: {
    width: '90%',
    marginLeft: '10px'
  },
  addBtn: {
    textDecoration: 'none',
    color: 'white'
  }
};

class Header extends Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleDash = () => {
    const { history } = this.props
    this.setState({ open: false });
    history.push('/dashboard')
  }

  Logout = () => {
    const { history } = this.props
    localStorage.removeItem('Token')
    localStorage.removeItem('Username')
    localStorage.removeItem('Role')
    history.push('/')
  }

  render() {
    const { classes, user, history, loc } = this.props;
    const { open } = this.state;
    const username = localStorage.getItem('Username')
    const role = localStorage.getItem('Role')
    const paths = [
      'profile',
      'maltem-cv',
      'edit-profile'
    ]
    return (
      <AppBar position="static">
        <Container>
          {
            (user || Token) ?
              <Toolbar className={classes.toolBar} disableGutters>
                <div className={classes.logoDiv} >
                  {loc && _.indexOf(paths, loc) !== -1 && <Back onClick={() => history.push('/search-result')} className={classes.icon} />}
                  <Link to='/'>
                    <SeekerBrand />
                  </Link>
                </div>
                {loc && loc !== "" && <div style={{ display: 'flex' }} >
                  <Button
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    className={classes.button}
                  >
                    <Profile
                      className={classes.icon}
                    />
                  </Button>
                  <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                              <MenuItem> <Person className={classes.icon2} /> {username}</MenuItem>
                              {role === 'admin' && <MenuItem onClick={this.handleDash}> <Dashboard className={classes.icon2} /> Dashboard</MenuItem>}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <Tooltip title='Search' ><Search onClick={() => history.push('/')} className={classes.icon} /></Tooltip>
                  <Tooltip title='Logout' ><LogOut onClick={() => this.Logout()} className={classes.icon} /></Tooltip>
                </div>}
              </Toolbar>
              :
              <Toolbar className={classes.toolBar} disableGutters>
                <Link to='/'>
                  <SeekerBrand />
                </Link>
              </Toolbar>
          }
        </Container>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    user: state.loginReducer.userCur,
    username: state.loginReducer.username,
    loc: state.searchState.location
  }
}

export default withStyles(styles)(connect(mapStateToProps, null)(withRouter(Header)))
