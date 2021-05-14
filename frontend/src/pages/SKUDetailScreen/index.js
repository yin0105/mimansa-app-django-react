import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';

import logo from '../../images/logo.png';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


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
        }

    }, [history]);

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
                        <Grid container spacing={3}>
                            <Grid item lg={6}>
                                <CardContent className="mx-3">
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
                                </CardContent>
                            </Grid>
                            <Grid item lg={6}>
                                <CardContent className="mx-3" alignItems="center"  justify="center">
                                    <div className="w-full text-center py-2">
                                        <Typography style={{ paddingRight: "20px" }}>
                                            CARTON: {next_carton}
                                        </Typography>                                        
                                    </div>
                                    <Box display="flex" 
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        {tote_type === "MONO" && 
                                            <TextField id="scan_carton_id" label="Carton ID" variant="outlined" className="mx-auto" />                                        
                                        }
                                    </Box>
                                    
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