import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Media from 'react-media';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import db from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 10,
    },
    status: {
        fontWeight: "bold",
        fontSize: '0.75rem',
        color: "white",
        backgroundColor: 'gray',
        borderRadius: '8px',
        padding: '3px 10px',
        display: "inline-block",
    },
    tableHeader: {
        fontWeight: "bold",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main)

    },
    radio_btn: {
        display: "contents"
    },
    text_field: {
        width: '100%',
    },
    mob_paper_card: {
        padding: '1em',
        marginBottom: '1em'
    },
    mob_date_title: {
        fontWeight: 'normal',
    },
    mob_date_value: {
        fontWeight: 'bold'
    },
    mob_center: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    mob_right: {
        alignSelf: 'center',
    },
    mob_btn: {
        textAlign: 'end',
    },
    mob_status: {
        fontWeight: "bold",
        fontSize: '0.75rem',
        color: "white",
        backgroundColor: 'gray',
        borderRadius: '8px',
        padding: '3px 10px',
        display: "inline-block",
    },
    mob_customer: {
        fontWeight: 'bold'
    },
    mob_total_sales: {
        padding: '1em'
    }
}));


export default function BasicTable() {
    const classes = useStyles();
    const [customers, setCustomers] = React.useState([])

    React.useEffect(() => {
        return db.collection('customers').orderBy('deliveryDate').onSnapshot((snapshot) => {
            const customerData = []
            snapshot.forEach(doc => customerData.push({...doc.data(), id: doc.id}))
            setCustomers(customerData)
        })
    }, [])

    const deleteCustomer = (id) => {
        db.collection("customers").doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const [item, setItem] = React.useState({});

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (item) => {
        setItem(item)
        setOpen(true)
    };

    const convertSecond = (sec) => {
        let dateFormat = require("dateformat");
        let curDate = new Date(null);
        let newCurDAte = curDate.setTime(sec * 1000);
        return sec ? dateFormat(newCurDAte, 'dd/mm/yyyy') : null
    }

    const EditCustomerInformation = () => {
        //! Convert date to modal change
        const convertDate = (currDate) => {
            if (currDate) {
                let date = currDate.seconds * 1000
                return new Date(date)
            } else {
                return null
            }
        }

        const [hookValue, setHookValue] = React.useState(0)
        const [tmpCustomer] = React.useState({...item})
        const handleChangeCustomer = (fieldName, fieldValue) => {
            tmpCustomer[fieldName] = fieldValue
            setHookValue(hookValue + 1)
        }

        //!Order Date
        const [orderDateHook, setOrderDate] = React.useState(convertDate(tmpCustomer.orderDate))
        const handleChangeOrderDate = (date) => {
            setOrderDate(date)
            handleChangeCustomer('orderDate', new Date(date))
        }

        //!Delivery Date
        const [deliveryDateHook, setDeliveryDate] = React.useState(convertDate(tmpCustomer.deliveryDate))
        const handleChangeDeliveryDate = (date) => {
            setDeliveryDate(date)
            handleChangeCustomer('deliveryDate', new Date(date))
        }

        //!Payment Date
        const [paymentDateHook, setPaymentDate] = React.useState(convertDate(tmpCustomer.paymentDate))
        const handleChangePaymentDate = (date) => {
            setPaymentDate(date)
            handleChangeCustomer('paymentDate', new Date(date))
        }

        //!Due Date
        const [dueDateHook, setDueDate] = React.useState(convertDate(tmpCustomer.dueDate))
        const handleChangeDueDate = (date) => {
            setDueDate(date)
            handleChangeCustomer('dueDate', new Date(date))
        }

        //!Update name in DB
        const updateDB = () => {
            let washingtonRef = db.collection("customers").doc(item.id)
            return washingtonRef.update(tmpCustomer)
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
        const handleCancel = () => {
            setOpen(false)
        };

        const handleUpdate = () => {

            updateDB()
            handleCancel()
        };


        return (
            //!Edit customer
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">EDIT CUSTOMER INFORMATION</DialogTitle>
                <DialogContent>
                    <Grid container item md={12} spacing={1}>
                        <Grid container item spacing={1}>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Customer Name" variant="outlined"
                                           value={tmpCustomer.name} onChange={(e) => {
                                    handleChangeCustomer('name', e.target.value)
                                }}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Company" variant="outlined"
                                           value={tmpCustomer.company} onChange={(e) => {
                                    handleChangeCustomer('company', e.target.value)
                                }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.text_field} label="Address" variant="outlined"
                                           value={tmpCustomer.address} onChange={(e) => {
                                    handleChangeCustomer('address', e.target.value)
                                }}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Phone" variant="outlined" type='tel'
                                           value={tmpCustomer.phone} onChange={(e) => {
                                    handleChangeCustomer('phone', e.target.value)
                                }}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="SGD" variant="outlined" type='number'
                                           value={tmpCustomer.amount} onChange={(e) => {
                                    handleChangeCustomer('amount', e.target.value)
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={6}>

                                    <KeyboardDatePicker
                                        className={classes.text_field}
                                        margin="dense"
                                        size="small"
                                        label="Order date"
                                        format="dd/MM/yyyy"
                                        value={orderDateHook}
                                        onChange={handleChangeOrderDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        className={classes.text_field}
                                        margin="dense"
                                        size="small"
                                        label="Delivery date"
                                        format="dd/MM/yyyy"
                                        value={deliveryDateHook}
                                        onChange={handleChangeDeliveryDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        className={classes.text_field}
                                        margin="dense"
                                        size="small"
                                        label="Payment date"
                                        format="dd/MM/yyyy"
                                        value={paymentDateHook}
                                        onChange={handleChangePaymentDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        className={classes.text_field}
                                        margin="dense"
                                        size="small"
                                        label="Due date"
                                        value={dueDateHook}
                                        onChange={handleChangeDueDate}
                                        format="dd/MM/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>

                            </MuiPickersUtilsProvider>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="status"
                                            defaultValue="NoPay"
                                            onChange={(e) => {
                                                handleChangeCustomer('status', e.target.value)
                                            }} value={tmpCustomer.status}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="NoPay"
                                            control={<Radio color="primary"/>}
                                            label="No pay"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="PayNow"
                                            control={<Radio color="primary"/>}
                                            label="PayNow"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="Consignment"
                                            control={<Radio color="primary"/>}
                                            label="Consignment"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="Cash"
                                            control={<Radio color="primary"/>}
                                            label="Cash"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="Bank"
                                            control={<Radio color="primary"/>}
                                            label="Bank transfer"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="PostPay"
                                            control={<Radio color="primary"/>}
                                            label="Post pay"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                </RadioGroup>

                            </FormControl>

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const CalcComission = () => {
        let comission = 0
        customers.map((item) => {
            if (item.status === 'PayNow' || item.status === 'Cash' || item.status === 'Bank') {
                return comission += Number(item.amount)
            } else {
                return comission
            }
        })
        return (
            <Typography variant='h4'>Total: {comission}</Typography>
        )
    }

    return (
        <div>
            <Media queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)"
            }}>
                {matches => (
                    <>
                        {matches.small && <div>
                            {customers.map((row) => (
                                <Paper key={row.id} className={classes.mob_paper_card}>
                                    <Grid container item xs={12} spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant='h6' className={classes.mob_customer}>{row.name}</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.mob_center}>
                                            <Typography className={classes.mob_status}
                                                        style={{
                                                            backgroundColor:
                                                                ((row.status === 'Cash' && 'green')) ||
                                                                ((row.status === 'Consignment' && 'orange')) ||
                                                                ((row.status === 'Bank' && 'mediumseagreen')) ||
                                                                ((row.status === 'PayNow' && 'olivedrab')) ||
                                                                ((row.status === 'PostPay' && 'tomato')) ||
                                                                ((row.status === 'NoPay' && 'red')),
                                                            width: '75px',
                                                            textAlign: 'center'
                                                        }}
                                            >{row.status}</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.mob_right}>
                                            <Typography  variant='h6'>{row.company}</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.mob_center}>
                                            <Typography variant='h4'>{row.amount}$</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className={classes.mob_date_value}>
                                                <Typography className={classes.mob_date_title}>Address:</Typography>{row.address}</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography className={classes.mob_date_value}>
                                                <Typography className={classes.mob_date_title}>Order date:</Typography>{convertSecond(row.orderDate.seconds)}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography className={classes.mob_date_value}><Typography
                                                className={classes.mob_date_title}>Payment
                                                date: </Typography>{convertSecond(row.paymentDate.seconds)}</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography className={classes.mob_date_value}><Typography
                                                className={classes.mob_date_title}>Delivery
                                                date: </Typography>{convertSecond(row.deliveryDate.seconds)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography className={classes.mob_date_value}><Typography
                                                className={classes.mob_date_title}>Due
                                                date: </Typography>{convertSecond(row.dueDate.seconds)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" color="primary" onClick={() => {
                                                handleClickOpen(row)
                                            }} startIcon={<EditIcon/>} >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} className={classes.mob_btn}>
                                            <Button variant="outlined" color="secondary" onClick={() => {
                                                deleteCustomer(row.id)
                                            }} startIcon={<DeleteOutlineIcon/>}>
                                                Delete
                                            </Button> </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                            <div className={classes.mob_total_sales}>
                                <CalcComission />
                            </div>

                            <EditCustomerInformation/>
                        </div>}
                        {matches.medium && <p>I am medium!</p>}
                        {matches.large && <div>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeader}>Name</TableCell>
                                            <TableCell className={classes.tableHeader}>Company name</TableCell>
                                            <TableCell className={classes.tableHeader}>Address</TableCell>
                                            <TableCell className={classes.tableHeader}>Phone number</TableCell>
                                            <TableCell className={classes.tableHeader}>SGD</TableCell>
                                            <TableCell className={classes.tableHeader}>Order date</TableCell>
                                            <TableCell className={classes.tableHeader}>Delivery date</TableCell>
                                            <TableCell className={classes.tableHeader}>Payment date</TableCell>
                                            <TableCell className={classes.tableHeader}>Due date</TableCell>
                                            <TableCell className={classes.tableHeader}>Status</TableCell>
                                            <TableCell className={classes.tableHeader}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {customers.map((row) => (

                                            <TableRow key={row.id}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.company}</TableCell>
                                                <TableCell>{row.address}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{convertSecond(row.orderDate.seconds)}</TableCell>
                                                <TableCell>{convertSecond(row.deliveryDate.seconds)}</TableCell>
                                                <TableCell>{convertSecond(row.paymentDate.seconds)}</TableCell>
                                                <TableCell>{convertSecond(row.dueDate.seconds)}</TableCell>
                                                <TableCell>
                                                    <Typography className={classes.status}
                                                                style={{
                                                                    backgroundColor:
                                                                        ((row.status === 'Cash' && 'green')) ||
                                                                        ((row.status === 'Consignment' && 'orange')) ||
                                                                        ((row.status === 'Bank' && 'mediumseagreen')) ||
                                                                        ((row.status === 'PayNow' && 'olivedrab')) ||
                                                                        ((row.status === 'PostPay' && 'tomato')) ||
                                                                        ((row.status === 'NoPay' && 'red')),
                                                                    width: '70px',
                                                                    textAlign: 'center'
                                                                }}>
                                                        {row.status}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => {
                                                        handleClickOpen(row)
                                                    }}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => {
                                                        deleteCustomer(row.id)
                                                    }}>
                                                        <DeleteOutlineIcon
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <CalcComission/>
                            </TableContainer>
                            <EditCustomerInformation/>
                        </div>}
                    </>
                )}
            </Media>
        </div>

    )
}


