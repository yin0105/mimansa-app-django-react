import React, { useState, } from 'react'
import { Button, TextField, Typography, Grid, LinearProgress, Snackbar, FormHelperText, } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../../components/menu';
import {DropzoneArea} from 'material-ui-dropzone';
import axios from 'axios'

import { restApiSettings } from "../../services/api";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  },
  grid_with_textfield: {
      display: 'flex',
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

    const handleLogoChange = files => {
        setLogo(files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code == "" || name == "" || rut == "" || addr_line_1 == "" || addr_line_2 == "" || locality == "" || city == "" || state == "" || zipcode == "" || phone == "" || logo.length == 0) {
            if (code == "") {
                setAlertMsg("Please enter code value.");                
            } else if (name == "") {
                setAlertMsg("Please enter name value.");                
            } else if (rut == "") {
                setAlertMsg("Please enter rut value.");                
            } else if (addr_line_1 == "") {
                setAlertMsg("Please enter Address Line 1 value.");                
            } else if (addr_line_2 == "") {
                setAlertMsg("Please enter Address Line 2 value.");                
            } else if (locality == "") {
                setAlertMsg("Please enter locality value.");                
            } else if (city == "") {
                setAlertMsg("Please enter city value.");                
            } else if (state == "") {
                setAlertMsg("Please enter state value.");                
            } else if (zipcode == "") {
                setAlertMsg("Please enter Zip Code value.");                
            } else if (phone == "") {
                setAlertMsg("Please enter Phone number value.");                
            } else if (logo.length == 0) {
                setAlertMsg("Please select logo image.");                
            }

            setSeverity("warning");
            setOpen(true);
            return;
        }
        
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

        let url = `${restApiSettings.baseURL}/warehouse/`;
        console.log("url = ", url);
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',            
            },
        }).then(res => {
            setAlertMsg("The warehouse has been created successfully.");                
            setSeverity("success");
            setOpen(true);
            history.push("/warehouse/list");
        }).catch(err => {
            if (err.response.status == 409) {
                setAlertMsg("The code is duplicated.");
            } else {
                setAlertMsg("Unknown error occurred.")
            }
            setSeverity("error");
            setOpen(true);
        })
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

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
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                label="Code"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                label="Name"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={rut}
                                onChange={e => setRut(e.target.value)}
                                label="RUT"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>                        
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={addr_line_1}
                                onChange={e => setAddrLine1(e.target.value)}
                                label="Address Line 1"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={addr_line_2}
                                onChange={e => setAddrLine2(e.target.value)}
                                label="Address Line 2"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                               
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={locality}
                                onChange={e => setLocality(e.target.value)}
                                label="Locality"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                label="City"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                label="State"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                className="m-2 w-full"
                                variant="outlined"
                                value={zipcode}
                                onChange={e => setZipcode(e.target.value)}
                                label="Zip Code"
                                autoFocus
                                InputProps={{
                                    readOnly: Boolean(loading),
                                }}
                            />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField                                        
                                    className="m-2 w-full"
                                    variant="outlined"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    
                                    label="Phone"
                                    autoFocus
                                    InputProps={{
                                        readOnly: Boolean(loading),
                                    }}
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
                            <DropzoneArea onChange={e => { handleLogoChange(e) }} />
                        </Grid>
                        <Grid item xs={4}
                        style={{ display: 'flex', justifyContent: "space-around", marginTop: "20px", }}>
                            <Button variant="contained" color="primary" type="submit" className="mr-20">Create</Button>
                            <Button variant="contained" color="primary" onClick={() => history.push("/warehouse/list")}>Go Back</Button>
                        </Grid>
                        
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {alert_msg}
                    </Alert>
                </Snackbar>
            </div>
        </>
        
    )
}

export default WarehouseCreate;