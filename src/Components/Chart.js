import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

const Chart = ({ weeklyCommits }) => {
    const [dataChart, setDataChart] = useState({});
    useEffect(() => {


        const fetchdata = () => {
            function parsePopulate(weeklyCommits) {
                let labels = [];
                let data = [];
                for (let j = 0; j < weeklyCommits.length; j++) {
                    let templabel = `wk ${weeklyCommits[j].week}, ${weeklyCommits[j].year}`
                    // console.log(templabel);
                    labels.push(templabel);
                    data.push(parseInt(weeklyCommits[j].totalCommit));
                }
                return { data, labels }
            }


            let commits = []
            let weeks = []

            for (let i = 0; i < weeklyCommits.length; i++) {
                commits.push(parseInt(weeklyCommits[i].totalCommit))
                weeks.push(parseInt(weeklyCommits[i].week))
            }
            let raw = parsePopulate(weeklyCommits);

            setDataChart({
                labels: raw.labels,
                datasets: [{
                    label: 'Commits',
                    backgroundColor: 'rgba(255, 99, 132,0)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: raw.data
                }]
            })
        }
        fetchdata()
    }, [weeklyCommits])
    return (
        <div className='chart-container'>
            <Line data={dataChart} width={320} height={320} />
        </div>
    );
};

export default Chart;