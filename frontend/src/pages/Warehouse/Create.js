import React, { useState, useEffect, useRef } from 'react'
import useCookie from 'react-use-cookie';
import { Button, TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper } from '@material-ui/core'
// import WithHeaderLayout from '../layouts/WithHeaderLayout';
import { useHistory } from 'react-router-dom';
// import AlertDialog from '../components';
// import { apiGetToteDetails } from '../services/news';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../../components/menu';
import {DropzoneArea} from 'material-ui-dropzone';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  table: {
    maxWidth: 1000,
  },
  cell: {
      wordBreak: 'break-word',
  }
}));


const StyledTextField = withStyles((theme) => ({
    root: {
        margin: "30px 0px",
    },
}))(TextField);


const  WarehouseCreate = () => {
    const classes = useStyles();
    let history = useHistory();

    const [sessionid, setSessionid] = useCookie('sessionid', 'mph3eugf0gh5hyzc8glvrt79r2sd6xu6');

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

    // const refUserId = useRef(null);
    // const refPassword = useRef(null);


    const handleLogoChange = files => {
        setLogo(files);
    }

    const handleKeyUp = e => {
        // if (e.keyCode === 13) {
        //     if (code === undefined) {
        //         setCode("");
        //     } else if (code === "") {
        //         setError("Please insert Tote Id!");
        //         setAlert(true);
        //     // } else {
        //     //     console.log('focus');
        //     //     refPassword.current.querySelector('input').focus();
        //     } else {
        //         // getToteDetails();
        //         ;
        //     }
        // }
    }

    const handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    const handleSubmit = (e) => {
        console.log("handleSubmit");
        console.log("logo = ", logo);
        console.log("logo[0] = ", logo[0]);
        console.log("logo[0].image = ", logo[0].image);

        e.preventDefault();
        let form_data = new FormData();
        form_data.append('code', code);
        form_data.append('name', name);
        form_data.append('rut', rut);
        form_data.append('addr_line_1', addr_line_1);
        form_data.append('addr_line_2', addr_line_2);
        form_data.append('locality', locality);
        form_data.append('city', city);
        form_data.append('state', state);
        form_data.append('zipcode', zipcode);
        form_data.append('phone', phone);
        form_data.append('logo', logo[0]);

        // const my_session_id = 'mph3eugf0gh5hyzc8glvrt79r2sd6xu6'
        // let cookies = {}
        // cookies['sessionid'] = my_session_id
        // cookies = {};
        // cookies['csrftoken']="tMxpfNzLyESs04SEYQrQbyrnvzlGDgMvchH0Mvx9JpkiqzbKuXa4SU6CsyTmEQQW";

        // axios.get(`http://localhost:8000/warehouse/`, {withCredentials: true}).then(res => {
        //     console.log("res = ", res);
        //     console.log("res.cookies = ", res.cookies);

        let url = `http://localhost:8000/warehouse/${code},`;
        axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data',            
            // 'X-CSRFToken': 'tMxpfNzLyESs04SEYQrQbyrnvzlGDgMvchH0Mvx9JpkiqzbKuXa4SU6CsyTmEQQW',
        },
        Cookie: {csrftoken: 'tMxpfNzLyESs04SEYQrQbyrnvzlGDgMvchH0Mvx9JpkiqzbKuXa4SU6CsyTmEQQW'},
        }).then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
        
        
      };

    // const handleChange = (files) => {
    //     setLogo(files);
    // }

    // const handleKeyUpPassword = e => {
    //     if (e.keyCode === 13) {
    //         // if (userid === undefined) {
    //         //     setUserId("");
    //         //     refUserId.current.querySelector('input').focus();
    //         // } else if (userid === "") {
    //         //     setError("Please insert User Id!");
    //         //     setAlert(true);                
    //         // } else if (password === undefined) {
    //         //     setPassword("");                
    //         // } else if (password === "") {
    //         //     setError("Please insert Password!");
    //         //     setAlert(true);
    //         // } else {
    //         //     validateUserId();
    //         // }
    //     }
    // }
    

    // useEffect(() => {
    //     sessionStorage.removeItem("scanInfo");
    // }, []);

    // const getToteDetails = () => {

    //     setLoading(true);

    //     apiGetToteDetails({ tote: tote_id })
    //         .then(res => {
    //             console.log('===== res: ', res);
    //             setLoading(false)

    //             if (res) {
    //                 setToteDetails(res.tote_details);
    //                 setCartonList(res.carton_list);
    //             }
    //         })
    //         .catch(function (error) {
    //             // Handle Errors here.
    //             setLoading(false);
    //             console.log('===== error: ', error);
    //             setError(error.message);
    //             setAlert(true);
    //             // ...
    //         });

    // }

    // const onClose = (error) => {
    //     console.log("error = ", error);
    //     setToteId(undefined);                                    
    //     setAlert(false);
    // }


    return (
        <>
            <MainMenu/>
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="mx-auto mt-8" style={{ maxWidth: "1000px" }}>
                <div className="w-full text-center mb-12">
                    <Typography variant="h3" color="primary">
                        Warehouse
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        direction="row"                                    
                        spacing={1}
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid
                            container
                            direction="row"                                    
                            spacing={3}
                            justify="space-evenly"
                            xs={9}
                        >
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Code"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Name"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={rut}
                                onChange={e => setRut(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="RUT"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>                        
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={addr_line_1}
                                onChange={e => setAddrLine1(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Address Line 1"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={addr_line_2}
                                onChange={e => setAddrLine2(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Address Line 2"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={locality}
                                onChange={e => setLocality(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Locality"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="City"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="State"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={zipcode}
                                onChange={e => setZipcode(e.target.value)}
                                onKeyUp={handleKeyUp}
                                label="Zip Code"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                                // ref={refPassword}
                            />
                            </Grid>
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
                                <TextField                                        
                                    className="m-2 w-full"
                                    variant="outlined"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    onKeyUp={handleKeyUp}
                                    label="Phone"
                                    autoFocus
                                    InputProps={{
                                        readOnly: Boolean(loading),
                                    }}
                                    // ref={refPassword}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"                                    
                            spacing={3}
                            justify="space-evenly"
                            xs={3}
                        >
                            {/* <Grid item xs={3}
                            style={{ display: 'flex', }}> */}
                                {/* <input type="file"
                                id="image"
                                accept="image/png, image/jpeg"  onChange={e => this.handleImageChange(e)} require /> */}
                                <DropzoneArea onChange={e => { handleLogoChange(e) }} />
                            {/* </Grid> */}
                        </Grid>
                        <Grid item xs={12}
                        style={{ display: 'flex', justifyContent: "center", marginTop: "20px", }}>
                            <Button variant="contained" color="primary" type="submit" >Create</Button>
                        </Grid>
                        
                    </Grid>
                </form>
            </div>
                
                
        </>
        
    )
}

export default WarehouseCreate;