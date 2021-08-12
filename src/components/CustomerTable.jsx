import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
                console.log("Document successfully deleted!");})
            .catch((error) => {
                console.error("Error removing document: ", error);});
    }

    const [item, setItem] = React.useState({});

    const [open, setOpen] = React.useState(false);
    // const handleClickOpen = (item) => {
    //     setItem(item)
    //     setOpen(true)
    // };

    const handleClose = () => {
        setOpen(false)
    };


    const convertDate = (currDate) => {
        if (currDate){
            let date = currDate.seconds*1000
            return new Date(date)
        } else {
            return null
        }
    }

    const convertSecond = (sec) => {
        let curDate = new Date(null);
        curDate.setTime(sec*1000);
        return sec ? curDate.toLocaleDateString('ru') : null
    }

    const [status, setStatus] = React.useState('NoPay')
    const handleChangeStatus = (status) => {
        setStatus(status)
    }

    //! Handle Change
    const [name, setName] = React.useState([{
        name: item.name
    }])
    const handleChangeName = (oldName) => {
        setName(oldName)
    }

    const EditCustomerInformation = () => {
        return (
            //!Edit customer
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">EDIT CUSTOMER INFORMATION</DialogTitle>
                <DialogContent>
                    <Grid container item md={12} spacing={1}>
                        <Grid container item spacing={1}>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Customer Name" variant="outlined"
                                           value={name} onChange={(e) => {handleChangeName(e.target.value)}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Company" variant="outlined"
                                           value={item.company}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.text_field} label="Address" variant="outlined"
                                           value={item.address}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Phone" variant="outlined" type='tel'
                                           value={item.phone}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="SGD" variant="outlined" type='number'
                                           value={item.amount}/>
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
                                        value={convertDate(item.orderDate)}
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
                                        value={convertDate(item.deliveryDate)}
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
                                        value={convertDate(item.paymentDate)}
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
                                        value={convertDate(item.dueDate)}
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
                                                handleChangeStatus(e.target.value)
                                            }} value={status}>
                                    <Grid item xs={6} justifyContent="space-between">
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
                                    <Grid item xs={6} >
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="Cash"
                                            control={<Radio color="primary"/>}
                                            label="Cash"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <FormControlLabel
                                            className={classes.radio_btn}
                                            value="Bank"
                                            control={<Radio color="primary"/>}
                                            label="Bank transfer"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
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
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
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
                                <TableCell >
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
                                    {/*<IconButton onClick={() => {handleClickOpen(row)}}>*/}
                                    {/*    <EditIcon/>*/}
                                    {/*</IconButton>*/}
                                    <IconButton onClick={() => {deleteCustomer(row.id)}}>
                                        <DeleteOutlineIcon
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Typography variant='h4'> <CalcComission /></Typography>
            </TableContainer>
            <EditCustomerInformation />
        </div>
    )
}


