import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const MergeSort = ({ data }) => {

    let correctIndex = [];
    const [p, setP] = useState(0);
    const [curElement, setCurElement] = useState(0);
    const [comparisions, setComparisions] = useState(0);
    const [lowElement, setLowElement] = useState(0);
    const [highElement, setHighElement] = useState(0);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        drawChart(data);
    }, [data]);

    const drawChart = (arr, low = -1, mid = -1, high = -1, highlightIndices = []) => {

        const width = 800;
        const height = 250;
        const svg = d3.select('#chart')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('*').remove(); // Clear previous drawings

        svg.selectAll('rect')
            .data(arr)
            .enter()
            .append('rect')
            .attr('x', (_, i) => i * (width / data.length))
            .attr('y', d => height - d)
            .attr('width', width / data.length - 2)
            .attr('height', d => d)
            .attr('fill', (_, i) => high == i ? 'orange' : mid == i ? 'yellow' : highlightIndices.includes(i) ? 'red' : low == i ? 'blue' : correctIndex.includes(i) ? 'green' : 'teal');

        svg.selectAll('text')
            .data(arr)
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', (d, i) => i * (width / data.length) + (width / data.length - 2) / 2) // Center the text in the bar
            .attr('y', d => height - d - 5) // Position above the bar
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .style('font-size', '12px');
    };

    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        const tempBlue = [];

        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;
        setP(arr[m]);
        setLowElement(arr[l]);
        setHighElement(arr[r]);
        drawChart(arr, l, m, r);  // blue, yellow, orange
        await new Promise(resolve => setTimeout(resolve, 500));

        while (i < n1 && j < n2) {
            setCurElement(arr[k]);
            setComparisions(prev => prev + 1);
            drawChart(arr, -1, -1, -1, [l + i, m + 1 + j]); // compared elements
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            drawChart(arr, l, m, r, [k]);
            await new Promise(resolve => setTimeout(resolve, 500));
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            drawChart(arr, l, m, r, [k]);
            await new Promise(resolve => setTimeout(resolve, 500));
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            drawChart(arr, l, m, r, [k]);
            await new Promise(resolve => setTimeout(resolve, 500));
            j++;
            k++;
        }
    }

    async function mergeSort(arr, l, r) {
        if (l < r) {
            let m = Math.floor((l + r) / 2);
            await mergeSort(arr, l, m);
            await mergeSort(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    }


    const startMergeSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        let arr = [...data];
        await mergeSort(arr, 0, arr.length - 1);
        correctIndex = arr.map((_, i) => i);
        drawChart(arr);
        setIsSorting(false);
    };
    return (
        <div className="flex flex-col items-center">
            <svg id="chart" className="mt-5"></svg>
            <div className='flex gap-8'>
                <button
                    onClick={startMergeSort}
                    className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={isSorting}
                >
                    Sort
                </button>
                <button
                    onClick={() => {
                        window.location.reload();
                    }}
                    className="mt-5 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
                >
                    Restart/Stop
                </button>
            </div>
            <div className='flex flex-col mt-5 w-[60vw]'>
                <div className='flex gap-5 justify-between'>
                    <h1 className='text-l font-bold text-gray-800'>Current Element <span className='bg-red-700 w-5 h-3 inline-block'></span> : {curElement}</h1>
                    <h1 className='text-l font-bold text-gray-800'>Low <span className='bg-blue-700 w-5 h-3 inline-block'></span> : {lowElement}</h1>
                    <h1 className='text-l font-bold text-gray-800'>Mid <span className='bg-yellow-300 w-5 h-3 inline-block'></span> : {p}</h1>
                    <h1 className='text-l font-bold text-gray-800'>High <span className='bg-orange-600 w-5 h-3 inline-block'></span> : {highElement}</h1>
                </div>
            </div>
                    <h1 className='text-l mt-5 font-bold text-gray-800'>Total Comparisions : {comparisions}</h1>
            <h1 className='text-xl font-bold mt-5 text-gray-800'>Sorted: <span className='bg-green-700 w-6 h-4 inline-block'></span></h1>
            <div className='flex flex-col justify-center items-center w-[60vw] mt-5'>
                <h1 className='text-xl font-bold text-gray-800'>Merge Sort</h1>
                <p className=''>Time Complexity: O(n log n)</p>
                <p className=''>Space Complexity: O(n)</p>
            </div>
        </div>
    );
}

export default MergeSort;


