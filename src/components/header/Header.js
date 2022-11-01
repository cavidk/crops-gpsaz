import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import UndoIcon from '@material-ui/icons/Undo';

import Button from '@material-ui/core/Button'
import {Link, useNavigate} from 'react-router-dom'
import {Box} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';

import "./css/header.css";

const request = require('../../resources/request');
const APP_CONSTANTS = require('../../ApplicationConstants')

const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

class Header extends Component {


    render(){
        return ('');
    }
}

export default Header

