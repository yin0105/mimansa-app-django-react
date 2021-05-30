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
  
const WarehouseList = () => {
    const classes = useStyles();
    let history = useHistory();
    const confirm = useConfirm();

    const [warehouse_list, setWarehouseList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [alert_msg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        getList();
    }, []);

    const getList = ()  => {
        axios.get(`${restApiSettings.baseURL}/warehouse/`)
            .then(res => {
                console.log(res = res)
                setWarehouseList(res.data);
            })
    }

    const deleteRow = (code) => {
        confirm({ description: 'Are you sure to delete the warehouse?' })
            .then(() => {
                axios.delete(`${restApiSettings.baseURL}/warehouse/?code=${code}`)
                    .then(res => {
                        setAlertMsg("The warehouse has been deleted successfully.");                
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
                        Warehouse
                    </Typography>
                </div>
                <Button variant="contained" color="primary" onClick={() => history.push("/warehouse/create")}>Add Warehouse</Button>
                {/* <Link to="/warehouse/create">Add Warehouse</Link> */}
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >No</TableCell>
                                <TableCell >Code</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >RUT</TableCell>
                                <TableCell >Address Line 1</TableCell>
                                <TableCell >Address Line 2</TableCell>
                                <TableCell >Locality</TableCell>
                                <TableCell >City</TableCell>
                                <TableCell >State</TableCell>
                                <TableCell >Zip Code</TableCell>
                                <TableCell >Phone</TableCell>
                                <TableCell >Logo</TableCell>
                                <TableCell >Creation Date</TableCell>
                                <TableCell >Modification Date</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            warehouse_list.map((warehouse, i) => 
                                <StyledTableRow key={i}>
                                    <TableCell key={"no_" + i} >{ i + 1 }</TableCell>
                                    <TableCell key={"code_" + i} >{warehouse.code}</TableCell>
                                    <TableCell key={"name_" + i} >{warehouse.name}</TableCell>
                                    <TableCell key={"rut_" + i} >{warehouse.rut}</TableCell>
                                    <TableCell key={"addr_line_1_" + i} >{warehouse.addr_line_1}</TableCell>
                                    <TableCell key={"addr_line_2_" + i} >{warehouse.addr_line_2}</TableCell>
                                    <TableCell key={"locality_" + i} >{warehouse.locality}</TableCell>
                                    <TableCell key={"city_" + i} >{warehouse.city}</TableCell>
                                    <TableCell key={"state_" + i} >{warehouse.state}</TableCell>
                                    <TableCell key={"zipcode_" + i} >{warehouse.zipcode}</TableCell>
                                    <TableCell key={"phone_" + i} >{warehouse.phone}</TableCell>
                                    <TableCell key={"logo_" + i} >
                                        {warehouse.logo !== null && <img src={`${backendSettings.logoBaseURL}/${warehouse.logo.split("/")[2]}`}/>}
                                    </TableCell>
                                        {/* {warehouse.logo}</TableCell> */}
                                    {/* <TableCell key={"logo_" + i} >{warehouse.logo}</TableCell> */}
                                    <TableCell key={"creation_date_" + i} >{warehouse.creation_date}</TableCell>
                                    <TableCell key={"modification_date_" + i} >{warehouse.modification_date}</TableCell>                                
                                    <TableCell key={"action_" + i} style={{ wordWrap: 'no-wrap'}}>
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => history.push(`/warehouse/edit/${warehouse.code}`)} style={{ marginBottom: '10px', }}><i className="fa fa-pencil"></i></Button>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => deleteRow(warehouse.code)}><i className="fa fa-trash"></i></Button>
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

export default WarehouseList;
