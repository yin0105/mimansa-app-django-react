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
    let history = useHistory();

    useEffect(() => {
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        if (scanInfo == null || scanInfo.userid === undefined) {
            console.log("NULL");
            history.push("/login");
        } else {
            console.log("scanInfo = ", scanInfo);
            console.log("scanInfo.userid = ", scanInfo.userid);
            var newInfo = { 
                userid: scanInfo.userid,
                whse: scanInfo.whse,
                whse_name: scanInfo.whse_name,
            };
            sessionStorage.setItem("scanInfo", JSON.stringify(newInfo));
        }
    }, [history]);

    return (
        <MainMenu/>
    )
}

export default Main;