import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../static/img/maltem-logo.png';
import LogOut from '@material-ui/icons/ExitToApp'
import Profile from '@material-ui/icons/AccountCircle'
import Search from '@material-ui/icons/Search'
import Register from '@material-ui/icons/PersonAdd'
import Tooltip from '@material-ui/core/Tooltip';
import history from '../utils/history'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
var Token = localStorage.getItem("Token");

const styles = {
  root: {
    flexGrow: 1,
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  bar: {
    backgroundColor: '#eb2f11'
  },
  icon: {
    marginLeft: '20px',
    fontSize: '25px',
    cursor: 'pointer'
  },
  logo: {
    width: '90%',
  },
  addBtn: {
    textDecoration: 'none',
    color: 'white'
  }
};

const Logout = () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('Username')
  window.location.reload();
}

const Header = (props) => {
  const { classes, user } = props;
  const username = localStorage.getItem('Username')
  let header = null
  if (user || Token) {
    header = <Toolbar className={classes.toolBar}>
      <Link to='/' ><img alt='logo' src={Logo} className={classes.logo} /></Link>
      <div>
        <Tooltip title={username} ><Profile className={classes.icon} /></Tooltip>
        <Tooltip title='Search' ><Search onClick={() => history.push('/')} className={classes.icon} /></Tooltip>
        <Tooltip title='Logout' ><LogOut onClick={() => Logout()} className={classes.icon} /></Tooltip>
      </div>
    </Toolbar>
  }
  else {
    header = <Toolbar className={classes.toolBar}>
      <Link to='/' ><img alt='logo' src={Logo} className={classes.logo} /></Link>
      <Tooltip title='Register' ><Link to="/register" className={classes.addBtn} ><Register /></Link></Tooltip>
    </Toolbar>
  }



  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        {header}
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    user: state.loginReducer.userCur,
    username: state.loginReducer.username
  }
}

export default withStyles(styles)(connect(mapStateToProps, null)(Header))