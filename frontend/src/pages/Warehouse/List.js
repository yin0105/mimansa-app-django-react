import React, { useState, useEffect } from 'react'
import { Button, Snackbar, TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper,} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../../components/menu';
import axios from 'axios'

import { restApiSettings } from "../../services/api";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 1150,
        marginBottom: 20,
        marginTop: 20,
    },
    cell: {
        wordBreak: 'break-word',
    }
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

    const [warehouse_list, setWarehouseList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [addr_line_1, setAddrLine1] = useState("");
    const [addr_line_2, setAddrLine2] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [logo, setLogo] = useState([]);

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const [alert_msg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        getList();
    }, []);

    // constructor(props) {
    //     super(props);
    //     this.onChangeTitle = this.onChangeTitle.bind(this);
    //     this.onChangeMessage = this.onChangeMessage.bind(this);



    //     // setting the initial states
    //     this.state = {
    //         id: '',
    //         title: '',
    //         message: '',
    //         postList: [],
    //         isLoading: true,
    //         isEditing: false,

    //     }
    // }
    // const onChangeTitle = (e) => {
    //     this.setState({
    //         title: e.target.value
    //     });
    // }
    // onChangeMessage(e) {
    //     this.setState({
    //         message: e.target.value
    //     });
    // }
    const getList = ()  => {
        axios.get(`${restApiSettings.baseURL}/warehouse/`)
            .then(res => {
                console.log(res = res)
                setWarehouseList(res.data);
            })
    }

    // componentDidMount() {
    //     this.getPost();
    // }

    // reset = () => {
    //     this.setState({
    //         id: '',
    //         title: '',
    //         message: ''
    //     })
    // }

    // showEditForm = () => {
    //     console.log("in show edit form")
    //     this.setState({
    //         isEditing: true
    //     })
    // }
    // editRow = (id, title, message) => {
    //     this.setState({
    //         id: id,
    //         title: title,
    //         message: message

    //     })
    // }
    // initialisePostView = (title, message) =>{
    //     console.log("initialise view")
    //     this.setState({
    //         titleField: title,
    //         messageField: message
    //     })
    // }

    const deleteRow = (id) => {
        axios.delete(`${restApiSettings.baseURL}/warehouse/${id}/`)
            .then(res => {
                setAlertMsg("The warehouse has been deleted successfully.");                
                setSeverity("success");
                setOpen(true);
            });
    }




    // render() {
    //     const { isLoading, postList } = this.state;
    //     let titleField
    //     let messageField
    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <>
            <MainMenu/>
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="mx-auto mt-8" style={{ maxWidth: "1150px" }}>
                <div className="w-full text-center mb-6">
                    <Typography variant="h3" color="primary">
                        Warehouse
                    </Typography>
                </div>
                <Button variant="contained" color="primary" onClick={() => history.push("/warehouse/create")}>Add Warehouse</Button>
                {/* <Link to="/warehouse/create">Add Warehouse</Link> */}
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >No</StyledTableCell>
                                <StyledTableCell >Code</StyledTableCell>
                                <StyledTableCell >Name</StyledTableCell>
                                <StyledTableCell >RUT</StyledTableCell>
                                <StyledTableCell >Address Line 1</StyledTableCell>
                                <StyledTableCell >Address Line 2</StyledTableCell>
                                <StyledTableCell >Locality</StyledTableCell>
                                <StyledTableCell >City</StyledTableCell>
                                <StyledTableCell >State</StyledTableCell>
                                <StyledTableCell >Zip Code</StyledTableCell>
                                <StyledTableCell >Phone</StyledTableCell>
                                <StyledTableCell >Logo</StyledTableCell>
                                <StyledTableCell >Creation Date</StyledTableCell>
                                <StyledTableCell >Modification Date</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            warehouse_list.map((warehouse, i) => 
                                <StyledTableRow key={i}>
                                    <StyledTableCell key={"no_" + i} >{ i + 1 }</StyledTableCell>
                                    <StyledTableCell key={"code_" + i} >{warehouse.code}</StyledTableCell>
                                    <StyledTableCell key={"name_" + i} >{warehouse.name}</StyledTableCell>
                                    <StyledTableCell key={"rut_" + i} >{warehouse.rut}</StyledTableCell>
                                    <StyledTableCell key={"addr_line_1_" + i} >{warehouse.addr_line_1}</StyledTableCell>
                                    <StyledTableCell key={"addr_line_2_" + i} >{warehouse.addr_line_2}</StyledTableCell>
                                    <StyledTableCell key={"locality_" + i} >{warehouse.locality}</StyledTableCell>
                                    <StyledTableCell key={"city_" + i} >{warehouse.city}</StyledTableCell>
                                    <StyledTableCell key={"state_" + i} >{warehouse.state}</StyledTableCell>
                                    <StyledTableCell key={"zipcode_" + i} >{warehouse.zipcode}</StyledTableCell>
                                    <StyledTableCell key={"phone_" + i} >{warehouse.phone}</StyledTableCell>
                                    <StyledTableCell key={"logo_" + i} >
                                        {warehouse.logo !== null && <img src={'http://localhost:8000/logo/' + warehouse.logo.split("/")[2]}/>}
                                    </StyledTableCell>
                                        {/* {warehouse.logo}</StyledTableCell> */}
                                    {/* <StyledTableCell key={"logo_" + i} >{warehouse.logo}</StyledTableCell> */}
                                    <StyledTableCell key={"creation_date_" + i} >{warehouse.creation_date}</StyledTableCell>
                                    <StyledTableCell key={"modification_date_" + i} >{warehouse.modification_date}</StyledTableCell>                                
                                    <StyledTableCell key={"action_" + i} style={{ wordWrap: 'no-wrap'}}>
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => history.push(`/warehouse/edit/${warehouse.id}`)} style={{ marginBottom: '10px', }}><i className="fa fa-pencil"></i></Button>
                                        <Button variant="outlined" id="printPageButton" onClick={ e => deleteRow(warehouse.id)}><i className="fa fa-trash"></i></Button>
                                    </StyledTableCell>
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
            
            // {/* <div>                
            //     <table className="table table-sm table-hover">
            //             <tbody>



            //         {(postList.map((item, i) => {

            //                     return [

            //                         <Fragment>


            //                             <tr key={i}>
            //                                 <td>{item.id}</td>
            //                                 <td>{item.title}</td>
            //                                 <td>{item.message}</td>

            //                                 <td>
            //                                     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            //                                     <Button variant="dark" id="printPageButton" onClick={(e) => this.showEditForm()}><i className="fa fa-pencil"></i></Button>
            //                                     <Button variant="light" id="printPageButton" onClick={(e) => this.deleteRow(item.id, e)}><i className="fa fa-trash"></i></Button>

            //                                 </td>
            //                             </tr>
            //                         </Fragment>

            //                     ];
            //             })
            //         )}
            //         </tbody>
            //     </table>
            // </div> */}
    // }
