import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useState, useEffect, useCallback } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { getUserToken, saveUserToken, clearUserToken } from "./localStorage";
import Typography from '@mui/material/Typography';
import('./App.css');



export default function TCardUser(props) {

    // var SERVER_URL = "https://430L.ml"
    // let [userToken, setUserToken] = useState(getUserToken());
    // let [show, setShow] = useState(true)

    // function confOffer(id) {
    //     return fetch(`${SERVER_URL}/offer/close/confirm/${id}`, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Bearer ' + userToken
    //         },
    //     }).then((response) => setShow(false))
    // }
    // function cancelOffer(id) {
    //     return fetch(`${SERVER_URL}/offer/close/cancel/${id}`, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Bearer ' + userToken
    //         },
    //     }).then((response) => setShow(false))
    // }
    return (
        <Card className={`base-class ${!props.usd_to_lbp ? 'card-buy' : 'card-sell'}`}
            sx={{ minWidth: 275, maxWidth: 345, maxHeight: 300 }}>
            <CardContent className="card-content">
                {props.usd_to_lbp === false && props.id != null &&
                    <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>Buying</Typography>
                }
                {props.usd_to_lbp === true &&
                    <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>Selling</Typography>
                }
                <div className="row-card">
                    <Typography >USD Amount:</Typography>
                    <Typography >{props.USDamount}</Typography>
                </div>
                <div className="row-card">
                    <Typography >Rate:</Typography>
                    <Typography >{props.rate}</Typography>
                </div>
                <div className="row-card">
                    <Typography >Date:</Typography>
                    <Typography >{props.date}</Typography>
                </div>
                <div className="row-card">
                    <Typography>Phone:</Typography>
                    <Typography >{props.phone}</Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" >Confirm</Button>
                <Button size="small" >Close</Button>
            </CardActions>
        </Card>
    );
}