import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import('./App.css');

export default function TCard(props) {
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
    </Card>
  );
}
