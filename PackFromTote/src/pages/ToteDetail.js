import React, { useState, useEffect, useRef } from 'react'
import { TextField, Typography, Grid, Card, CardContent, CardHeader, LinearProgress, TableHead, TableCell, TableBody, TableRow, Table, TableContainer, Paper } from '@material-ui/core'
import WithHeaderLayout from '../layouts/WithHeaderLayout';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../components';
import { apiGetToteDetails } from '../services/news';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MainMenu from '../components/menu';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  table: {
    maxWidth: 800,
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
    const [tote_details, setToteDetails] = useState(null);
    const [carton_list, setCartonList] = useState([]);

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
            if (tote_id === undefined) {
                setToteId("");
            } else if (tote_id === "") {
                setError("Please insert Tote Id!");
                setAlert(true);
            // } else {
            //     console.log('focus');
            //     refPassword.current.querySelector('input').focus();
            } else {
                getToteDetails();
            }
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
                    setToteDetails(res.tote_details);
                    setCartonList(res.carton_list);
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
                { 
                    tote_details &&  <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableCell>tote</TableCell>
                                <TableCell>tote_type</TableCell>
                                <TableCell>tote_status</TableCell>
                                <TableCell>distinct_skus</TableCell>
                                <TableCell>distinct_carton</TableCell>
                                <TableCell>requiring_vas</TableCell>
                                <TableCell>distinct_classifications</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                <TableCell>{tote_details.tote}</TableCell>
                                <TableCell>{tote_details.tote_type}</TableCell>
                                <TableCell>{tote_details.tote_status}</TableCell>
                                <TableCell>{tote_details.distinct_skus}</TableCell>
                                <TableCell>{tote_details.distinct_carton}</TableCell>
                                <TableCell>{tote_details.requiring_vas}</TableCell>
                                <TableCell>{tote_details.distinct_classifications}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                {/* {tote_details && <Grid item xs={10}>
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
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote"
                                        value={tote_details.tote}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote_type"
                                        value={tote_details.tote_type}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="tote_status"
                                        value={tote_details.tote_status}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_skus"
                                        value={tote_details.distinct_skus}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_carton"
                                        value={tote_details.distinct_carton}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="requiring_vas"
                                        value={tote_details.requiring_vas}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="distinct_classifications"
                                        value={tote_details.distinct_classifications}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>} */}

                {carton_list && carton_list.map((carton, i) => 
                <Grid item xs={10}>
                    <Card>
                        <CardHeader
                            title={`carton_list [${i}]`}
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                        <CardContent className="mt-1 mx-3">
                            <Grid
                                container
                                direction="row"                                    
                                spacing={3}
                            >
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="carton_nbr"
                                        key={`carton_nbr_${i}`}
                                        value={carton.carton_nbr}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="stat_code"
                                        key={`stat_code_${i}`}
                                        value={carton.stat_code}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_id"
                                        key={`sku_id_${i}`}
                                        value={carton.sku_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_brcd"
                                        key={`sku_brcd_${i}`}
                                        value={carton.sku_brcd}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="dsp_sku"
                                        key={`dsp_sku_${i}`}
                                        value={carton.dsp_sku}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="sku_desc"
                                        key={`sku_desc_${i}`}
                                        value={carton.sku_desc}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="to_be_pakd_units"
                                        key={`to_be_pakd_units_${i}`}
                                        value={carton.to_be_pakd_units}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="units_pakd"
                                        key={`units_pakd_${i}`}
                                        value={carton.units_pakd}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={3} justify="space-evenly"
                                alignItems="center" style={{ display: 'flex', }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="remaining"
                                        key={`remaining_${i}`}
                                        value={carton.remaining}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>)}
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