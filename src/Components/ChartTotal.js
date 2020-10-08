import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

const Chart = ({ projects }) => {
    const [dataChart, setDataChart] = useState({});
    useEffect(() => {


        const fetchdata = () => {
            let totalCommits = []
            for (let i = 0; i < projects.length; i++) {
                totalCommits.push(projects[i].weeklyCommits)
            }



            console.log('totalcomit', totalCommits);

            //main function for generating the label and the data.
            function parsePopulate(weeklyCommits) {
                let labels = [];
                let data = [];
                for (let j = 0; j < weeklyCommits.length; j++) {
                    let templabel = `wk ${weeklyCommits[j].week}, ${weeklyCommits[j].year}`
                    // console.log(templabel);
                    labels.push(templabel);
                    data.push(weeklyCommits[j].totalCommit);
                }
                return { data, labels }
            }

            function parseUserTotal(projects) { //project is an array of array. the internal array contains type weeklyCommits.
                let labels = [];
                let data = [];
                for (let j = 0; j < projects.length; j++) {
                    let tempdataset = parsePopulate(projects[j]);
                    console.log("tempdataset = ", tempdataset);
                    for (let k = 0; k < tempdataset.labels.length; k++) {
                        let cursor = labels.indexOf(tempdataset.labels[k])
                        if (cursor !== -1) {
                            data[cursor] = data[cursor] + tempdataset.data[k]
                        } else {
                            data.push(tempdataset.data[k]);
                            labels.push(tempdataset.labels[k])
                        }
                    }
                }
                return { data, labels }
            }

            let raw = parseUserTotal(totalCommits);

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
    }, [projects])
    return (
        <div className='chart-container'>
            <Line data={dataChart} />
        </div>
    );
};

export default Chart;