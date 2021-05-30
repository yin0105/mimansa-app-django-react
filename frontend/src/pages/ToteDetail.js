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
        minWidth: 650,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


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
    const [res, setRes] = useState(null);

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            if (tote_id === undefined) {
                setToteId("");
            } else if (tote_id === "") {
                setError("Please insert Tote Id!");
                setAlert(true);
            } else {
                getToteDetails();
            }
        }
    }
    

    const getToteDetails = () => {

        setLoading(true);

        apiGetToteDetails({ tote: tote_id })
            .then(res => {
                console.log('===== res: ', res);
                setLoading(false)

                if (res) {
                    setRes(res);
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

            {
                res && res.tote_details &&
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
                            justify="center"
                            alignItems="baseline"
                            spacing={6}
                            // className="pt-12"
                        >
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableCell className={classes.cell} style={{ width: '280px', }}>tote</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>tote_type</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>tote_status</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>distinct_skus</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>distinct_carton</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>requiring_vas</TableCell>
                                        <TableCell className={classes.cell} style={{ width: '120px', }}>distinct_classifications</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.cell} style={{ width: '280px', }}>{res.tote_details.tote}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.tote_type}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.tote_status}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.distinct_skus}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.distinct_carton}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.requiring_vas}</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '120px', }}>{res.tote_details.distinct_classifications}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </CardContent>
                </Card>
            }
            
            {
                res && res.carton_list &&
                <Card>
                    <CardHeader
                        title="cartons"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ textAlign: "center" }}
                    />
                    <CardContent className="mt-1 mx-3">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="baseline"
                            spacing={6}
                            // className="pt-12"
                        >
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>carton_nbr</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>stat_code</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>sku_id</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>sku_brcd</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>dsp_sku</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>sku_desc</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>to_be_pakd_units</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>units_pakd</TableCell>
                                            <TableCell className={classes.cell} style={{ width: '110px', }}>remaining</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {   res.carton_list.map(carton => 
                                            <StyledTableRow>
                                                <TableCell className={classes.cell} style={{ width: '170px', }}>{carton.carton_nbr}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '110px', }}>{carton.state_code}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '100px', }}>{carton.sku_id}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '130px', }}>{carton.sku_brcd}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '80px', }}>{carton.dsp_sku}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '220px', }}>{carton.sku_desc}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '80px', }}>{carton.to_be_pakd_units}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '60px', }}>{carton.units_pakd}</TableCell>
                                                <TableCell className={classes.cell} style={{ width: '50px', }}>{carton.remaining}</TableCell>
                                            </StyledTableRow>
                                        ) 
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>                
                    </CardContent>
                </Card>
            }
            <AlertDialog item="User Id" error={error} open={alert} handleClose={() => onClose(error)}/>
        </>
        
    )
}

export default ToteDetail;