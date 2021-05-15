import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, TextField, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components';
import { apiValidateSKU } from '../../services/news';


const IDDetailScreen = () => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [skuid, setSKUId] = useState("");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const [userid, setUserId] = useState("");
    const [lpnid, setLPNId] = useState("");
    const [tote_type, setToteType] = useState("");
    const [location, setLocation] = useState("");

    const [sku, setSKU] = useState("");
    const [cartons, setCartons] = useState("");
    const [classification, setClassification] = useState("");

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (skuid === "") {
                setError("Please insert SKU Id!")
                setAlert(true);
            } else {
                validateSKUId();
            }
        }
    }

    useEffect(() => {

        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        if (scanInfo === null || scanInfo.lpnid === undefined) {
            history.push("/id");
        } else {
            setLPNId(scanInfo.lpnid);
            setToteType(scanInfo.tote_type);
            setUserId(scanInfo.userid);
            setLocation(scanInfo.location);

            setSKU(scanInfo.distinct_skus);
            setCartons(scanInfo.carton);
            setClassification(scanInfo.classification);
        }
        if (scanInfo !== null && scanInfo.skuid !== undefined) {
            var newInfo = {
                userid: scanInfo.userid,
                location: scanInfo.location,
                lpnid: scanInfo.lpnid,
                tote_type: scanInfo.tote_type,
                distinct_skus: scanInfo.distinct_skus,
                carton: scanInfo.carton,
                whse: scanInfo.whse, 
                classification: scanInfo.classification,
            };
            sessionStorage.setItem("scanInfo", JSON.stringify(newInfo));
        }

    }, [history]);

    const validateSKUId = () => {

        setLoading(true);

        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        apiValidateSKU({ whse: scanInfo.whse, tote: scanInfo.lpnid, sku_brcd: skuid, login_user_id: scanInfo.userid })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false);
                if (res) {
                    var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));
                    var newObj = Object.assign({}, scanInfo, { skuid: skuid, image: res.sku_image_url, desc: res.sku_desc, dsp_sku: res.dsp_sku, next_carton: res.next_carton_nbr, qty: res.next_carton_qty, sku_brcd_list: res.sku_brcd_list });
                    sessionStorage.setItem("scanInfo", JSON.stringify(newObj));
                    history.push('/sku');
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                setLoading(false);
                console.log('===== error: ', error.message);
                setError(error.message);
                setAlert(true);
                // ...
            });

    }

    const onClose = () => {
        setSKUId("");
        setAlert(false);
    }

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
                    <Card className="mt-12">
                        <div className="p-6">
                            <CardHeader
                                title="ID Detail Screen"
                                titleTypographyProps={{ variant: 'h4' }}
                                style={{ textAlign: "center" }}
                            />
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
                                        CARTONS: {cartons}
                                    </Typography>
                                </div>
                                <div className="w-full text-center py-2">
                                    <Typography style={{ paddingRight: "20px" }}>
                                        CLASSIFICATION: {classification}
                                    </Typography>
                                </div>
                                <div className="flex items-center mx-auto pt-10">
                                    <TextField
                                        className="m-2 w-full"
                                        variant="outlined"
                                        value={skuid}
                                        onChange={e => setSKUId(e.target.value)}
                                        onKeyUp={handleKeyUp}
                                        label="SKU ID"
                                        autoFocus
                                    />
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                    <AlertDialog item="SKU id" error={error} open={alert} handleClose={onClose} />
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default IDDetailScreen;