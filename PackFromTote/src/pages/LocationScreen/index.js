import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, TextField, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components';
import { apiValidateLocation } from '../../services/news';

const LocationScreen = () => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [userid, setUserId] = useState("");
    const [whse, setWhse] = useState("");
    const [whse_name, setWhseName] = useState("");

    const [location, setLocation] = useState("");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (location === undefined) {
                setLocation("");
            } else if (location === "") {
                setError("Please insert Location!")
                setAlert(true);
            } else {
                validateLocation();
            }
        }
    }

    useEffect(() => {
        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        if (scanInfo === null || scanInfo.userid === undefined) {
            history.push("/user");
        }
        if (scanInfo !== null && scanInfo.location !== undefined) {
            var newInfo = { userid: scanInfo.userid, whse: scanInfo.whse, whse_name: scanInfo.whse_name };
            sessionStorage.setItem("scanInfo", JSON.stringify(newInfo));
        }
        if (scanInfo !== null) {
            setUserId(scanInfo.userid);
            setWhse(scanInfo.whse);
            setWhseName(scanInfo.whse_name);
        }

    }, [history]);


    const validateLocation = () => {

        setLoading(true);

        var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));

        apiValidateLocation({ whse: whse, locn_brcd: location, login_user_id: scanInfo.userid })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false);
                if (res) {
                    var scanInfo = JSON.parse(sessionStorage.getItem("scanInfo"));
                    var newObj = Object.assign({}, scanInfo, { location:location, dsp_locn: res.dsp_locn, reserve_locn: res.reserve_locn, staging_locn: res.staging_locn, printer_name: res.printer_name, print_mode: res.print_mode, }); //location: location, 
                    sessionStorage.setItem("scanInfo", JSON.stringify(newObj));
                    history.push('/id');
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

    const onClose = () => {
        setLocation(undefined);
        setAlert(false);
    }

    return (
        <WithHeaderLayout title="Location Screen">
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="p-6">
                <div className="w-full text-right">
                    {userid !== "" && userid}
                </div>
                <div className="mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="w-full ">
                        <div className="w-full text-center">
                            <Typography variant="h3" color="primary">
                                Pack LPN
                        </Typography>
                        </div>
                        <Card className="mt-2">
                            <div className="p-4">
                                <CardHeader
                                    title="Location Screen"
                                    titleTypographyProps={{ variant: 'h4' }}
                                    style={{ textAlign: "center" }}
                                />
                                <CardContent className="mt-8 mx-3">
                                    <TextField
                                        className="m-2 w-full"
                                        variant="outlined"
                                        value={location}
                                        onChange={e => setLocation(e.target.value.toUpperCase())}
                                        onKeyUp={handleKeyUp}
                                        label="Location"
                                        autoFocus
                                        InputProps={{ readOnly: Boolean(loading), }}
                                    />
                                </CardContent>
                            </div>
                        </Card>
                        <AlertDialog item="location" error={error} open={alert} handleClose={onClose}/>
                    </div>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default LocationScreen;