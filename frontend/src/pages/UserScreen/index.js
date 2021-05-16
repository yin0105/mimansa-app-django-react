import React, { useState, useEffect } from 'react'
import { TextField, Typography, Card, CardContent, CardHeader, LinearProgress } from '@material-ui/core'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components';
import { apiValidateUserId } from '../../services/news';


const UserScreen = () => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [userid, setUserId] = useState("");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (userid === "") {
                setError("Please insert User Id!");
                setAlert(true);
            } else {
                validateUserId();
            }
        }
    }

    useEffect(() => {
        sessionStorage.removeItem("scanInfo");
    }, []);

    const validateUserId = () => {

        setLoading(true);

        apiValidateUserId({ login_user_id: userid })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false)

                if (res) {
                    sessionStorage.setItem("scanInfo", JSON.stringify({ userid: userid }));
                    history.push('/location');
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
        setUserId("");
        setAlert(false);
    }

    return (
        <WithHeaderLayout title="User Screen">
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="p-6">
                <div className="w-full text-right">
                    &nbsp;
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
                                    title="User Screen"
                                    titleTypographyProps={{ variant: 'h4' }}
                                    style={{ textAlign: "center" }}
                                />
                                <CardContent className="mt-8 mx-3">
                                    <TextField
                                        className="m-2 w-full"
                                        variant="outlined"
                                        value={userid}
                                        onChange={e => setUserId(e.target.value.toUpperCase())}
                                        onKeyUp={handleKeyUp}
                                        label="User ID"
                                        autoFocus
                                        InputProps={{
                                            readOnly: Boolean(loading),
                                        }}
                                    />
                                </CardContent>
                            </div>
                        </Card>
                        <AlertDialog item="User Id" error={error} open={alert} handleClose={onClose} />
                    </div>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default UserScreen;