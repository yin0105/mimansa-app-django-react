import React, { useState, } from 'react'
import useCookie from 'react-use-cookie';
import { Button, TextField, Typography, Grid, LinearProgress, } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../../components/menu';
import {DropzoneArea} from 'material-ui-dropzone';
import axios from 'axios'

import { restApiSettings } from "../../services/api";

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

    const handleLogoChange = files => {
        setLogo(files);
    }

    const handleSubmit = (e) => {
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

        let url = `${restApiSettings.baseURL}/warehouse/${code}`;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',            
            },
        }).then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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
                            <Grid item xs={4}
                            style={{ display: 'flex', }}>
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