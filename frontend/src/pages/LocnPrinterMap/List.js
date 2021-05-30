import React, { useState, useEffect } from 'react'
import { Button, Snackbar, TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper,} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../../components/menu';
import axios from 'axios'

import { restApiSettings, backendSettings } from "../../services/api";
import MuiAlert from '@material-ui/lab/Alert';
import { useConfirm } from 'material-ui-confirm';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center',
    },
    body: {
        fontSize: 14,
        textAlign: 'center',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const StyledTextField = withStyles((theme) => ({
    root: {
        margin: "30px 0px",
    },
}))(TextField);
  
const LocnPrinterMapList = () => {
    const classes = useStyles();
    let history = useHistory();
    const confirm = useConfirm();

    const [locnprintermap_list, setLocnPrinterMapList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [alert_msg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        getList();
    }, []);

    const getList = ()  => {
        axios.get(`${restApiSettings.baseURL}/locnprintermap/`)
            .then(res => {
                console.log(res = res)
                setLocnPrinterMapList(res.data);
            })
    }

    const deleteRow = (id) => {
        confirm({ description: 'Are you sure to delete the locnprintermap?' })
            .then(() => {
                axios.delete(`${restApiSettings.baseURL}/locnprintermap/?id=${id}`)
                    .then(res => {
                        setAlertMsg("The locnprintermap has been deleted successfully.");                
                        setSeverity("success");
                        setOpen(true);
                        getList();
                    });
            }).catch(() => {});
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <>
            <MainMenu/>
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="mx-auto mt-8">
                <div className="w-full text-center mb-6">
                    <Typography variant="h3" color="primary">
                        LocnPrinterMap
                    </Typography>
                </div>
                <Button variant="contained" color="primary" onClick={() => history.push("/locnprintermap/create")}>Add LocnPrinterMap</Button>
                {/* <Link to="/locnprintermap/create">Add LocnPrinterMap</Link> */}
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >No</TableCell>
                                <TableCell >Warehouse Code</TableCell>
                                <TableCell >Reserve Location</TableCell>
                                <TableCell >Staging Location</TableCell>
                                <TableCell >Printer name</TableCell>
                                <TableCell >Creation Date</TableCell>
                                <TableCell >Modification Date</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            locnprintermap_list.map((locnprintermap, i) => 
                                <StyledTableRow key={i}>
                                    <TableCell key={"no_" + i} >{ i + 1 }</TableCell>
                                    <TableCell key={"whse_code_" + i} >{locnprintermap.whse_code}</TableCell>
                                    <TableCell key={"reserve_locn_" + i} >{locnprintermap.reserve_locn}</TableCell>
                                    <TableCell key={"staging_locn_" + i} >{locnprintermap.staging_locn}</TableCell>
                                    <TableCell key={"printer_name_" + i} >{locnprintermap.printer_name}</TableCell>
                                    <TableCell key={"creation_date_" + i} >{locnprintermap.creation_date}</TableCell>
                                    <TableCell key={"modification_date_" + i} >{locnprintermap.modification_date}</TableCell>                                
                                    <TableCell key={"action_" + i} style={{ wordWrap: 'no-wrap'}}>
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => history.push(`/locnprintermap/edit/${locnprintermap.id}`)}><i className="fa fa-pencil"></i></Button>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => deleteRow(locnprintermap.id)}><i className="fa fa-trash"></i></Button>
                                    </TableCell>
                                </StyledTableRow>
                            )
                        }
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {alert_msg}
                    </Alert>
                </Snackbar>
            </div>
        </>
        
    )
}

export default LocnPrinterMapList;
