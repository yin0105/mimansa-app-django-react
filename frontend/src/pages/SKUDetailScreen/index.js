import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, TextField, Card, CardHeader, CardContent, LinearProgress, Grid, Box, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import AlertDialog from '../../components';
import { apiValidateActionCode, apiValidatePackCarton } from '../../services/news';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#ffffff',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        backgroundColor: '#ffffff',
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#eeeeee',
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        border: '1px solid #cccccc',
    },
});


const SKUDetailScreen = () => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");
    // const [skuid, setSKUId] = useState("");
    const [userid, setUserId] = useState("");
    const [lpnid, setLPNId] = useState("");
    const [tote_type, setToteType] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    const [desc, setDesc] = useState("");
    const [sku, setSKU] = useState("");
    // const [dspsku, setDspSku] = useState("");
    const [next_carton, setNextCarton] = useState("");
    const [qty, setQty] = useState(0);
    const [sku_brcd_list, setSkuBrcdList] = useState([]);
    const [scannedSKU, setScannedSKU] = useState(0);
    const [sku_brcd, setSkuBrcd] = useState("");
    const [scan_carton, setScanCarton] = useState("");
    const [scan_carton_feedback, setScanCartonFeedback] = useState("");
    const [scan_carton_feedback_error, setScanCartonFeedbackError] = useState(false);
    const [scan_carton_feedback_queue, setScanCartonFeedbackQueue] = useState([]);
    const [push_url, setPushUrl] = useState("");

    const [open, setOpen] = useState(false);
    const [alert_msg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    
    let pre_scannedSKU = 0

    useEffect(() => {
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));
        if (scanInfo === null || scanInfo.skuid === undefined) {
            history.push("/iddetail");
        } else {
            // setSKUId(scanInfo.skuid);
            setLPNId(scanInfo.lpnid);
            setToteType(scanInfo.tote_type);
            setUserId(scanInfo.userid);
            setLocation(scanInfo.location);
            setImage(scanInfo.image);

            setDesc(scanInfo.desc);
            setSKU(scanInfo.dsp_sku);
            setNextCarton(scanInfo.next_carton);
            setQty(scanInfo.qty);
            setSkuBrcdList(scanInfo.sku_brcd_list);
            // pre_scannedSKU = 0
            console.log("sku_brcd_list = ", scanInfo.sku_brcd_list)
        }

    }, [history]);

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //   return;
        // }
        setOpen(false);
        if (push_url !== "") {
            history.push(push_url);
        }
    };

    const handleSKUKeyUp = e => {
        if (e.keyCode === 13) {
            console.log("sku_brcd_list = ", sku_brcd_list);
            console.log("sku_brcd = ", sku_brcd);
            if (sku_brcd_list.some(item => sku_brcd === item)) {
                if (scannedSKU < qty) {
                    setScannedSKU(scannedSKU + 1);
                    setSkuBrcd("");
                }
            } else if (sku_brcd === "SHORT") {
                setScannedSKU(qty);
                setSkuBrcd("");
            } else {
                setError(`Incorrect Barcode : ${sku_brcd}`)
                setAlert(true);
            }            
        }
    }

    const handleCartonKeyUp = e => {
        if (e.keyCode === 13) {
            validateSKUBrcd();
        }
    }

    const inputSkuBrcd = e => {
        setSkuBrcd(e.target.value)
    }

    const inputScanCarton = e => {
        setScanCarton(e.target.value)
    }

    const onClose = () => {
        setSkuBrcd("");
        setAlert(false);
    }

    const validateSKUBrcd = () => {
        setLoading(true);
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        if (scan_carton === "DAMAGED" || scan_carton === "DISCREPANCY" || scan_carton === "REPRINT") {
            apiValidateActionCode({ whse: scanInfo.whse, carton_nbr: next_carton, action_code: scan_carton, login_user_id: userid })
                .then(res => {
                    console.log('===== res: ', res);
                    setLoading(false);
                    if (res) {
                        console.log('==== res.message: ', res.message);
                        setScanCartonFeedback(res.message);
                        setScanCartonFeedbackError(false);  
                    }
                })
                .catch(function (error) {
                    setLoading(false);
                    console.log('===== error: ', error.message);
                    setScanCartonFeedback(error.message);
                    setScanCartonFeedbackError(true);
                    let msg_to_add = "";
                    if (scan_carton === "DAMAGED") {
                        msg_to_add = "Carton DAMAGED";
                    } else if (scan_carton === "DISCREPANCY") {
                        msg_to_add = "Carton DISCREPANCY";
                    } else if (scan_carton === "REPRINT") {
                        msg_to_add = "Carton PRINTED";
                    }
                    setScanCartonFeedbackQueue(scan_carton_feedback_queue => [...scan_carton_feedback_queue, msg_to_add]);     
                });
                            
        } else if (scan_carton == next_carton) {
            apiValidatePackCarton({ whse: scanInfo.whse, carton_nbr: scan_carton, tote: lpnid, tote_type: tote_type, login_user_id: userid, sku_id: sku, qty: qty })
                .then(res => {
                    console.log('===== res: ', res);
                    setLoading(false);
                    if (res) {
                        console.log('==== res.message: ', res.message);
                        setScanCartonFeedback(res.message);
                        setScanCartonFeedbackError(false);
                        
                        if (res.next_carton_details.next_carton_qty === 0) {
                            if (res.tote_details.tote_status === 95) {
                                setPushUrl("/id");
                            } else {
                                setPushUrl("/iddetail");
                            }
                            setAlertMsg(res.message);
                            setSeverity("success");
                            setOpen(true);
                        } else {
                            setNextCarton(res.next_carton_details.next_carton_nbr);
                            setPushUrl("");
                            setScanCarton("");
                            setQty(res.next_carton_details.next_carton_qty);
                            setScannedSKU(0);
                            
                            if (res.tote_details.tote_status === 95) {
                                setPushUrl("/id");
                            } else {

                            }
                        }
                                                
                    }
                })
                .catch(function (error) {
                    setLoading(false);
                    console.log('===== error: ', error.message);
                    setScanCartonFeedback(error.message);
                    setScanCartonFeedbackError(true);
                });
        } else {
            setAlertMsg("Invalid Carton");
            setSeverity("warning");
            setOpen(true);
        }
    }

    const classes = useStyles();

    return (
        <WithHeaderLayout title="ID Screen">
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="p-8">

                <div className="w-full text-right">
                    {userid !== "" && location !== "" &&
                        <span>{userid} @ {location}</span>
                    }
                </div>
                <div className="mx-auto" style={{ maxWidth: "1000px" }}>
                    <div className="w-full text-center">
                        <Typography variant="h3" color="primary">
                            Pack LPN
                        </Typography>
                    </div>
                    
                    <Card className="p-6 mt-12">
                        <CardHeader
                            title="SKU Detail Screen"
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                        />
                        <Grid container spacing={0}>
                            <Grid item lg={5}>
                                <CardContent>
                                    <div>
                                        <div className="w-full text-center py-2">
                                            <Typography style={{ paddingRight: "20px" }}>
                                                LPN ID: {lpnid} ({tote_type})
                                            </Typography>
                                        </div>
                                        <div className="w-full text-center py-2">
                                            <Typography style={{ paddingRight: "20px" }}>
                                                SKU: {sku}
                                            </Typography>
                                        </div>
                                        <div className="w-full text-center py-2">
                                            <Typography style={{ paddingRight: "20px" }}>
                                                SKU DESC: {desc}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center mt-10">
                                            {image !== "" &&
                                                <img className="w-32 h-32 mx-auto" src={image} alt="demo" />
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Grid>
                            <Grid item lg={1} py={12}>
                                <CardContent style={{ height: "100%" }}>
                                    <Box display="flex" alignItems="center" justifyContent="center" py={2}  style={{ height: "100%" }}>
                                        <div style={{ width: "2px", backgroundColor: "rgba(0, 0, 0, 24%)", height: "100%"}}/>
                                    </Box>
                                </CardContent>
                            </Grid>
                            <Grid item lg={6}>
                                <CardContent>
                                    <div className="w-full text-center py-2">
                                        <Typography style={{ paddingRight: "20px" }}>
                                            CARTON: {next_carton}
                                        </Typography>                                        
                                    </div>
                                    {tote_type === "MONO" && 
                                        <>
                                            <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                                                <TextField id="scan_carton_id" label="Carton ID" variant="outlined" value={scan_carton} className="mx-auto" helperText={scan_carton_feedback} error={scan_carton_feedback_error} onChange={e => inputScanCarton(e)} onKeyUp={handleCartonKeyUp} />
                                            </Box>
                                            <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                                                <TableContainer component={Paper}>
                                                    <Table className={classes.table} aria-label="error message table" style={{ backgroundColor: "#eeeeee" }}>
                                                        <TableBody>
                                                        {scan_carton_feedback_queue.map((row, i) => (
                                                            <StyledTableRow key={i}>
                                                                <StyledTableCell scope="row" align="center">{row}</StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </>
                                    }
                                    {tote_type === "MULTI" && 
                                        <>
                                            <div className="w-full text-center py-2">
                                                <Typography style={{ paddingRight: "20px" }}>
                                                    SKU: {sku}
                                                </Typography>                                       
                                            </div>
                                            <div className="w-full text-center py-2">
                                                <Typography style={{ paddingRight: "20px" }}>
                                                    QTY: {qty} Unit{qty > 0 && "s"} {
                                                        scannedSKU > 0 && (`(Scanned : ${scannedSKU} , Pending : ${(qty - scannedSKU)})`)
                                                    }
                                                </Typography>                                       
                                            </div>
                                            <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                                                {scannedSKU < qty &&
                                                    <TextField id="sku_brcd" label="SKU" variant="outlined" value={sku_brcd} className="mx-auto" onChange={e => inputSkuBrcd(e)} onKeyUp={handleSKUKeyUp} />                                        
                                                }
                                                {scannedSKU == qty &&
                                                    <TextField id="scan_carton_id" label="Carton ID" variant="outlined" value={scan_carton} className="mx-auto" helperText={scan_carton_feedback} error={scan_carton_feedback_error} onChange={e => inputScanCarton(e)} onKeyUp={handleCartonKeyUp} />
                                                }
                                            </Box>
                                        </>
                                    }
                                    
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                    <AlertDialog item="SKU Detail" error={error} open={alert} handleClose={onClose} />
                    <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity}>
                            {alert_msg}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default SKUDetailScreen;