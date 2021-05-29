import React, { useState, useEffect } from 'react'
import { Button, Snackbar, TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper,} from '@material-ui/core'
import { useHistory } from 'react-router-dom';
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
        maxWidth: 1050,
    },
    cell: {
        wordBreak: 'break-word',
    }
}));
  
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

    // deleteRow = (id) => {
    //     axios.delete('http://127.0.0.1:8000/api/posts' + `/${id}/`)
    //         .then(res => {
    //             // ToastsStore.warning('Successfully Deleted!');
    //             this.getPost();
    //         });
    // }




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
            <div className="mx-auto mt-8" style={{ maxWidth: "1050px" }}>
                <div className="w-full text-center mb-12">
                    <Typography variant="h3" color="primary">
                        Warehouse
                    </Typography>
                </div>
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="simple table" className={classes.table}>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            warehouse_list.map((warehouse, i) => {
                                <TableRow>
                                    <TableCell >{ i + 1 }</TableCell>
                                    <TableCell >{warehouse.code}</TableCell>
                                    <TableCell >{warehouse.name}</TableCell>
                                    <TableCell >{warehouse.rut}</TableCell>
                                    <TableCell >{warehouse.addr_line_1}</TableCell>
                                    <TableCell >{warehouse.addr_line_2}</TableCell>
                                    <TableCell >{warehouse.locality}</TableCell>
                                    <TableCell >{warehouse.city}</TableCell>
                                    <TableCell >{warehouse.state}</TableCell>
                                    <TableCell >{warehouse.zipcode}</TableCell>
                                    <TableCell >{warehouse.phone}</TableCell>
                                    <TableCell >{warehouse.logo}</TableCell>
                                    <TableCell >{warehouse.creation_date}</TableCell>
                                    <TableCell >{warehouse.modification_date}</TableCell>                                
                                </TableRow>
                            })
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
