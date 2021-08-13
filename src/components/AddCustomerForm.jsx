import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {useDispatch} from "react-redux";
import {addCustomerAC} from "../reducers/addCustomerFormReducer";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    text_field: {
        width: '100%',
    },
    border: {
      border: '1px solid grey',
        borderRadius: '5px',
        padding: '1em',
        display: 'inline-block'
    },
    paper: {
        minWidth: '100px',
        margin: '1em 0',
        padding: '1em'
    },
    btn: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '8px ',

    },
    form_control: {
        width: '80%'
    },
    radio_group: {
        display: "flex",
        flexDirection: "column"
    },
    radio_btn: {
        display: "contents"
    },
    fab: {
        zIndex: '1',
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function AddCustomerForm() {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };


    const [name, setName] = React.useState('')
    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const [company, setCompany] = React.useState('')
    const handleChangeCompany = (e) => {
        setCompany(e.target.value)
    }

    const [address, setAddress] = React.useState('')
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const [phone, setPhone] = React.useState('')
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const [amount, setAmount] = React.useState('')
    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    //!Order Date
    const [orderDate, setOrderDate] = React.useState(Date.now())
    const handleChangeOrderDate = (date) => {
        setOrderDate(date)
    }

    //!Delivery Date
    const [deliveryDate, setDeliveryDate] = React.useState(Date.now())
    const handleChangeDeliveryDate = (date) => {
        setDeliveryDate(date)
    }



    //!Delivery Date
    const [paymentDate, setPaymentDate] = React.useState(Date.now())
    const handleChangePaymentDate = (date) => {
        setPaymentDate(date)
    }


    //!Delivery Date
    const [dueDate, setDueDate] = React.useState(Date.now())
    const handleChangeDueDate = (date) => {
        setDueDate(date)
    }

    const [status, setStatus] = React.useState('NoPay')

    const handleChangeStatus = (status) => {
        setStatus(status)
    }

    const addCustomer = () => {
        const customer = {
            name: name,
            company: company,
            address: address,
            phone: phone,
            amount: amount,
            orderDate: orderDate,
            deliveryDate: deliveryDate,
            paymentDate: paymentDate,
            dueDate: dueDate,
            status: status
        }
        dispatch(addCustomerAC(customer))
        setName('')
        setAddress('')
        setCompany('')
        setPhone('')
        setAmount('')
        setOrderDate(Date.now)
        setDeliveryDate(Date.now)
        setPaymentDate(Date.now)
        setDueDate(Date.now)
        handleClose()
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">ADD SALES</DialogTitle>
                <DialogContent>
                    <Grid container item md={12} spacing={1}>
                        <Grid container item spacing={1}>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Customer Name" variant="outlined"
                                           value={name} onChange={handleChangeName}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Company" variant="outlined"
                                           value={company} onChange={handleChangeCompany}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.text_field} label="Address" variant="outlined"
                                           value={address} onChange={handleChangeAddress}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="Phone" variant="outlined" type='tel'
                                           value={phone} onChange={handleChangePhone}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.text_field} label="SGD" variant="outlined" type='number'
                                           value={amount} onChange={handleChangeAmount}/>
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
                                        value={orderDate}
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
                                        value={deliveryDate}
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
                                        value={paymentDate}
                                        onChange={handleChangePaymentDate}
                                        format="dd/MM/yyyy"
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
                                        value={dueDate}
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
                                                    handleChangeStatus(e.target.value)
                                                }} value={status}>
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
                    <Button onClick={addCustomer} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper className={classes.paper}>
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="PayNow"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="No pay"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="Consignment"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="Cash"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="Bank transfer"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="Bank"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Checkbox*/}
            {/*                // checked={state.checkedB}*/}
            {/*                // onChange={handleChange}*/}
            {/*                name="checkedB"*/}
            {/*                color="primary"*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label="Post pay"*/}
            {/*    />*/}
            {/*    <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
            {/*        <div className={classes.border}>*/}
            {/*            <KeyboardDatePicker*/}
            {/*                margin="dense"*/}
            {/*                size="small"*/}
            {/*                label="Start period"*/}
            {/*                format="dd/MM/yyyy"*/}
            {/*                // value={orderDate}*/}
            {/*                // onChange={handleChangeOrderDate}*/}
            {/*                KeyboardButtonProps={{*/}
            {/*                    'aria-label': 'change date',*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            <KeyboardDatePicker*/}
            {/*                margin="dense"*/}
            {/*                size="small"*/}
            {/*                label="End period"*/}
            {/*                format="dd/MM/yyyy"*/}
            {/*                // value={orderDate}*/}
            {/*                // onChange={handleChangeOrderDate}*/}
            {/*                KeyboardButtonProps={{*/}
            {/*                    'aria-label': 'change date',*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*</MuiPickersUtilsProvider>*/}
            {/*    /!*<Button color="primary" variant='outlined'>filter</Button>*!/*/}
            </Paper>
            <Fab color='primary' className={classes.fab} label='add' onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </>

    )
}
