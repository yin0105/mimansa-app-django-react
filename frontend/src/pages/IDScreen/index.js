import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, TextField, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components';
import { apiValidateLPNId } from '../../services/news';

const IDScreen = () => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [userid, setUserId] = useState("");
    const [location, setLocation] = useState("");

    const [lpnid, setLPNId] = useState("");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");


    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (lpnid === "") {
                setError("Please insert LPN Id!")
                setAlert(true);
            } else {
                validateLPNId();
            }
        }
    }

    useEffect(() => {
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));


        if (scanInfo === null || scanInfo.location === null) {
            history.push("/location");
        }
        if (scanInfo !== null && scanInfo.lpnid !== undefined) {
            var newInfo = { userid: scanInfo.userid, location: scanInfo.location, whse: scanInfo.whse };
            sessionStorage.setItem("scanInfo", JSON.stringify(newInfo));
        }
        if (scanInfo !== null) {
            setUserId(scanInfo.userid);
            setLocation(scanInfo.location);
        }

    }, [history]);

    const validateLPNId = () => {

        setLoading(true);

        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        apiValidateLPNId({ whse: scanInfo.whse, tote: lpnid, login_user_id: scanInfo.userid })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false);
                if (res) {
                    var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));
                    console.log(" == whse = ", scanInfo.whse)
                    var newObj = Object.assign({}, scanInfo, { lpnid: lpnid, distinct_skus: res.distinct_skus, carton: res.distinct_carton, classification: res.distinct_classifications, tote_type: res.tote_type });
                    sessionStorage.setItem("scanInfo", JSON.stringify(newObj));
                    history.push('/iddetail');
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
        setLPNId("");
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
                        <span>{userid} @ {location}</span>}
                </div>
                <div className="mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="w-full ">
                        <div className="w-full text-center">
                            <Typography variant="h3" color="primary">
                                Pack LPN
                        </Typography>
                        </div>
                        <Card className="mt-12">
                            <div className="p-6">
                                <CardHeader
                                    title="ID Screen"
                                    titleTypographyProps={{ variant: 'h4' }}
                                    style={{ textAlign: "center" }}
                                />
                                <CardContent className="mt-8 mx-3">
                                    <TextField
                                        className="m-2 w-full"
                                        variant="outlined"
                                        value={lpnid}
                                        onChange={e => setLPNId(e.target.value)}
                                        onKeyUp={handleKeyUp}
                                        label="LPN ID"
                                        autoFocus
                                    />
                                </CardContent>
                            </div>
                        </Card>
                        <AlertDialog item="LPN id" error={error} open={alert} handleClose={onClose} />
                    </div>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default IDScreen;