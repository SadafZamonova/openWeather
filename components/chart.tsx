import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = () => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataes = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -10, max: 40 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (
        <Line options={options} data={dataes} />
    )
}


export default Charts;