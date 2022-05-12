
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import TCard from './Tcard';
import React, { useState } from "react";
import './App.css';
import { Chart } from 'primereact/chart';


export default function ChartUsd(props) {
        return (
                <div className="card">
                    <div className='chart-text'>
                    <Typography variant="h4">Max: {props.max}</Typography>
                    <Typography variant="h4">Min: {props.min}</Typography>
                    <Typography variant="h4">Average:{props.average}</Typography>
                    </div>
                    <Chart className='' type="line" data={props.data} />
                </div>
        )
  }