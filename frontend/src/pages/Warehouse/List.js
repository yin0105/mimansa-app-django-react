import React, { useState, useEffect, useRef, Component, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import 'mdbreact/dist/css/mdb.css'

// import { ToastsContainer, ToastsStore } from 'react-toasts';
// import { IoMdTrash } from "react-icons/io";

import { TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper } from '@material-ui/core'
import './style.css';
// import { MdDoneAll } from "react-icons/md";
// import { TiPencil, TiUpload, TiArrowSync } from "react-icons/ti";
// import {MDBCard, MDBInput, MDBCol, MDBContainer, MDBRow, MDBBtn,MDBIcon,MDBCardBody } from 'mdbreact';


const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 1000,
    },
    cell: {
        wordBreak: 'break-word',
    }
}));
  

const WarehouseList = () => {
    const classes = useStyles();
    let history = useHistory();

    const [warehouse_list, setWarehouseList] = useState([]);

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

    // getPost() {
    //     axios.get(`http://127.0.0.1:8000/api/posts/`)
    //         .then(res => {
    //             console.log(res)
    //             this.setState({
    //                 postList: res.data,
    //                 isLoading: false
    //             });
    //         })
    // }

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

        return (
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead>
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
        );
    // }
}

export default WarehouseList;