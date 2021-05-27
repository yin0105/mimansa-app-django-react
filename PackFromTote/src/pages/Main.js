import React, { useState, useEffect, useRef } from 'react'
import { TextField, Typography, Card, CardContent, CardHeader, LinearProgress } from '@material-ui/core'
import WithHeaderLayout from '../layouts/WithHeaderLayout';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../components';
import { apiValidateUserId } from '../services/news';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';

import MainMenu from '../components/menu';

const  Main = () => {
    return (
        <MainMenu/>
    )
}

export default Main;