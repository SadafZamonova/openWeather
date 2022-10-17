import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import {HourlyProps } from '../types';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({hourly}:HourlyProps) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
           
        },
    };


    const dataes = {
        labels: hourly?.list?.splice(0,10).map((item) => item.weather[0].description) || '',
        datasets: [
            {
                data:  hourly?.list?.splice(0,10).map((item) => item.main.temp || 0) || [0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    console.log(dataes)


    if(!hourly.list || !hourly.list?.length) {
        return null
    }

    return (
        <Line options={options} data={dataes} height={420} width={600} />
    )
}


export default Charts;