import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';

import logo from '../../images/logo.png';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { string } from 'prop-types';


const SKUDetailScreen = () => {

    let history = useHistory();

    const [skuid, setSKUId] = useState("");
    const [userid, setUserId] = useState("");
    const [lpnid, setLPNId] = useState("");
    const [tote_type, setToteType] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    const [desc, setDesc] = useState("");
    const [sku, setSKU] = useState("");
    const [dspsku, setDspSku] = useState("");
    const [next_carton, setNextCarton] = useState("");
    const [qty, setQty] = useState(0);
    const [sku_brcd_list, setSkuBrcdList] = useState([]);
    const [scannedSKU, setScannedSKU] = useState(0);

    useEffect(() => {
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));
        if (scanInfo === null || scanInfo.skuid === undefined) {
            history.push("/iddetail");
        } else {
            setSKUId(scanInfo.skuid);
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
            console.log("sku_brcd_list = ", scanInfo.sku_brcd_list)
        }

    }, [history]);

    const validateSkuBrcd = e => {
        console.log("sku_brcd_list = ", sku_brcd_list)
        console.log("e.target.value = ", e.target.value)
        if (sku_brcd_list.some(item => e.target.value === item)) {
            setScannedSKU(scannedSKU + 1);
        }

    }

    return (
        <WithHeaderLayout title="ID Screen">
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
                                        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                                            <TextField id="scan_carton_id" label="Carton ID" variant="outlined" className="mx-auto" />                                        
                                        </Box>
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
                                                        scannedSKU > 0 && ("Scanned : " + scannedSKU + " Pending : " + (qty - scannedSKU))
                                                    }
                                                </Typography>                                       
                                            </div>
                                            <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                                                <TextField id="scan_sku" label="SKU" variant="outlined" className="mx-auto" onChange={e => validateSkuBrcd(e)} />                                        
                                            </Box>
                                        </>
                                    }
                                    
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default SKUDetailScreen;