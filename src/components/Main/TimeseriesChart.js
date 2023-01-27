import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const TimeseriesChart = (props) => {
    const [dates, setDates] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        if (props.statistics.stats && props.statistics.stats !== stats) {
            setStats(props.statistics.stats)
        }

        if (props.statistics.dates && props.statistics.dates !== dates) {
            setDates(props.statistics.dates)
        }
    }, [props.statistics]);


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        // aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart'
            }
        }
    };
    const data = {
        labels: dates,
        datasets: [
            {
                label: '2022/2023',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: stats
            }
        ]
    };

    return (
        <div className={'chart'}>
            <Line data={data} options={options}/>
        </div>
    );
}

export default TimeseriesChart;
