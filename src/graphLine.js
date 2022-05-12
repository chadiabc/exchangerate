import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './graphLine.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Chart } from 'primereact/chart';

export class LineChart extends Component {

    constructor(props) {
        super(props);

        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 12, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                }
            ]
        };

        this.options = this.getLightTheme();
    }

    getLightTheme() {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return {
            basicOptions,
        }
    }

    render() {
        const { basicOptions, multiAxisOptions } = this.options;

        return (
                <div className="card">
                    <h5>Basic</h5>
                    <Chart className='' type="line" data={this.basicData} options={basicOptions} />
                </div>
        )
    }
}