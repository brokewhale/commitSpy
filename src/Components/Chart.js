import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ weeklyCommits }) => {
    const [dataChart, setDataChart] = useState({});
    console.log(weeklyCommits);
    return (
        <div>
            <canvas id="myChart"></canvas>

        </div>
    );
};

export default Chart;