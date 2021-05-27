import React, { useState, useEffect, useRef } from 'react'
import { TextField, Typography, Card, CardContent, CardHeader, LinearProgress } from '@material-ui/core'
import WithHeaderLayout from '../layouts/WithHeaderLayout';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../components';
import { apiGetToteDetails } from '../services/news';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import MainMenu from '../components/menu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const StyledTextField = withStyles((theme) => ({
    root: {
        margin: "30px 0px",
    },
}))(TextField);


const  ToteDetail = () => {
    const classes = useStyles();
    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [tote_id, setToteId] = useState("");
    
    const [tote, setTote] = useState("");
    const [tote_type, setToteType] = useState("");
    const [tote_status, setToteStatus] = useState("");
    const [distinct_skus, setDistinctSkus] = useState("");
    const [distinct_carton, setDistinctCarton] = useState("");
    const [requiring_vas, setRequiringVas] = useState("");
    const [distinct_classifications, setDistinctClassifications] = useState("");
    const [carton_nbr, setCartonNbr] = useState("");
    const [stat_code, setStatCode] = useState("");
    const [sku_id, setSkuId] = useState("");
    const [sku_brcd, setSkuBrcd] = useState("");
    const [dsp_sku, setDspSku] = useState("");
    const [sku_desc, setSkuDesc] = useState("");
    const [to_be_pakd_units, setToBePakdUnits] = useState("");
    const [units_pakd, setUnitsPakd] = useState("");
    const [remaining, setRemaining] = useState("");

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    // const refUserId = useRef(null);
    // const refPassword = useRef(null);


    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            // if (userid === undefined) {
            //     setUserId("");
            // } else if (userid === "") {
            //     setError("Please insert User Id!");
            //     setAlert(true);
            // } else {
            //     console.log('focus');
            //     refPassword.current.querySelector('input').focus();
            // }
        }
    }

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
    

    useEffect(() => {
        sessionStorage.removeItem("scanInfo");
    }, []);

    const getToteDetails = () => {

        setLoading(true);

        apiGetToteDetails({ tote: tote_id })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false)

                if (res) {
                    setTote(res.tote);
                    setToteType(res.tote_type);
                    setToteStatus(res.tote_status);
                    setDistinctSkus(res.distinct_skus);
                    setDistinctCarton(res.distinct_carton);
                    setRequiringVas(res.requiring_vas);
                    setDistinctClassifications(res.distinct_classifications);
                    setCartonNbr(res.carton_nbr);
                    setStatCode(res.stat_code);
                    setSkuId(res.sku_id);
                    setSkuBrcd(res.sku_brcd);
                    setDspSku(res.dsp_sku);
                    setSkuDesc(res.sku_desc);
                    setToBePakdUnits(res.to_be_pakd_units);
                    setUnitsPakd(res.units_pakd);
                    setRemaining(res.remaining);
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                setLoading(false);
                console.log('===== error: ', error);
                setError(error.message);
                setAlert(true);
                // ...
            });

    }

    const onClose = (error) => {
        console.log("error = ", error);
        setToteId(undefined);                                    
        setAlert(false);
    }


    return (
        <>
            <MainMenu/>
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="mx-auto mt-8" style={{ maxWidth: "600px" }}>
                <div className="w-full ">
                    <Card>
                        {/* <div className="p-4"> */}
                            <CardContent className="mt-1 mx-3">
                                <StyledTextField                                        
                                    className="m-2 w-full"
                                    variant="outlined"
                                    value={tote_id}
                                    onChange={e => setToteId(e.target.value)}
                                    onKeyUp={handleKeyUp}
                                    label="Tote ID"
                                    autoFocus
                                    InputProps={{
                                        readOnly: Boolean(loading),
                                    }}
                                    // ref={refPassword}
                                />
                            </CardContent>
                        {/* </div> */}
                    </Card>
                </div>
            </div>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="baseline"
                spacing={6}
                className="pt-12"
            >
                <Grid item xs={5}>
                    <Card>
                        <CardHeader
                            title="tote_details"
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                        <CardContent className="mt-1 mx-3">
                            <Grid
                                container
                                direction="row"                                    
                                spacing={3}
                            >
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote"
                                        value={tote}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote_type"
                                        value={tote_type}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote_status"
                                        value={tote_status}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_skus"
                                        value={distinct_skus}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_carton"
                                        value={distinct_carton}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="requiring_vas"
                                        value={requiring_vas}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_classifications"
                                        value={distinct_classifications}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={5}>
                    <Card>
                        <CardHeader
                            title="carton_list"
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                        <CardContent className="mt-1 mx-3">
                            <Grid
                                container
                                direction="row"                                    
                                spacing={3}
                            >
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="carton_nbr"
                                        value={carton_nbr}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="stat_code"
                                        value={stat_code}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_id"
                                        value={sku_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_brcd"
                                        value={sku_brcd}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="dsp_sku"
                                        value={dsp_sku}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_desc"
                                        value={sku_desc}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="to_be_pakd_units"
                                        value={to_be_pakd_units}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="units_pakd"
                                        value={units_pakd}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="remaining"
                                        value={remaining}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* <div className="d-flex">
                <div className="mx-auto mt-8" col={5} style={{ maxWidth: "600px" }}>
                    <div className="w-full ">
                        <Card>
                        <CardHeader
                            title="Tote Detail"
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                            <CardContent className="mt-1 mx-3">
                                <div>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Read Only"
                                        defaultValue="Hello World"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Read Only"
                                        defaultValue="Hello World"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />


                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div> */}

                {/* <div className="mx-auto mt-8" col={5} style={{ maxWidth: "600px" }}>
                    <div className="w-full ">
                        <Card>
                        <CardHeader
                            title="Tote Detail"
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                            <CardContent className="mt-1 mx-3">
                                <div>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Read Only"
                                        defaultValue="Hello World"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Read Only"
                                        defaultValue="Hello World"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />


                                </div>
                            </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
            </div> */}
                    
            

                    <AlertDialog item="User Id" error={error} open={alert} handleClose={() => onClose(error)}/>
                    
                {/* </div>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <div class="w-100 mx-auto"  style={{ maxWidth: "1000px" }}>
                <div>

                    <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                    <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    />
                    <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField id="standard-search" label="Search field" type="search" />
                    <TextField
                    id="standard-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    />
                    <TextField
                    id="filled-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    />
                    <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    />
                    <TextField id="filled-search" label="Search field" type="search" variant="filled" />
                    <TextField
                    id="filled-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="filled"
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="outlined"
                    />
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                    <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
                    <TextField
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="outlined"
                    />
                </div>
            </div>
            </form> */}
        </>
        
    )
}

export default ToteDetail;