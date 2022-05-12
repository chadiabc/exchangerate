import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
// Component that presents a dialog to collect credentials from the user
export default function OfferDialog({
    open,
    onSubmit,
    onClose,
    title,
    submitText,
}) {
    let [usd_to_lbp, setUsd_to_lbp] = useState(true);
    let [usd_amount, setUsdamount] = useState("");
    let [rate, setRate] = useState("");
    return (
        <Dialog  open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <div className="dialog-container">
                <DialogTitle>{title}</DialogTitle>
                <Select className='offer-dialog-select'
                  id="transaction-type"
                  value={usd_to_lbp}
                  onChange={e => setUsd_to_lbp(e.target.value)}
                >
                  <MenuItem value={true}>USD to LBP</MenuItem>
                  <MenuItem value={false}>LBP to USD</MenuItem>
                </Select> 
                <div className="form-item">
                    <TextField
                        fullWidth
                        label="usd_amount"
                        type="number"
                        value={usd_amount}
                        onChange={({ target: { value } }) => setUsdamount(value)}
                    />
                </div>
                <div className="form-item">
                    <TextField
                        fullWidth
                        label="Rate"
                        type="rate"
                        value={rate}
                        onChange={({ target: { value } }) => setRate(value)}
                    />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => onSubmit(usd_to_lbp,usd_amount,rate)}
                >
                    {submitText}
                </Button>
            </div>
        </Dialog>
    );
}