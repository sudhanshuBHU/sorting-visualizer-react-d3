import React from 'react';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const InsertionSort = ({ data }) => {
    const [isSorting, setIsSorting] = useState(false);
    const [comparisions, setComparisions] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [key, setKey] = useState(0);
    useEffect(() => {
        drawChart(data);
    }, [data]);

    const drawChart = (arr, minIndex = -1, curIndex = -1, correctedIndex = [], tempBlue = []) => {
        const width = 800;
        const height = 250;
        const svg = d3.select('#chart')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('*').remove(); // Clear previous drawings

        // Draw bars
        svg.selectAll('rect')
            .data(arr)
            .enter()
            .append('rect')
            .attr('x', (_, i) => i * (width / data.length))
            .attr('y', d => height - d)
            .attr('width', width / data.length - 2) // Adjust width to fit bars
            .attr('height', d => d)
            .attr('fill', (_, i) => correctedIndex.includes(i) ? 'green' : i == minIndex ? 'blue' : i == curIndex ? 'red' : tempBlue.includes(i) ? 'blue' : 'teal');

        // Add numbers on top of bars
        svg.selectAll('text')
            .data(arr)
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', (_, i) => i * (width / data.length) + (width / data.length - 2) / 2) // Center the text in the bar
            .attr('y', d => height - d - 5) // Position above the bar
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .style('font-size', '12px');
    };


    const insertionSort = async () => {
        let arr = [...data];
        const correctedIndex = [];
        if (isSorting) return;
        setIsSorting(true); // Prevent multiple clicks

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            setKey(key);
            let j = i - 1;
            const tempBlue = [i];
            drawChart(arr, i, j, correctedIndex);
            await new Promise(resolve => setTimeout(resolve, 500));

            while (j >= 0 && arr[j] > key) {
                setComparisions(prev => prev + 1);
                arr[j + 1] = arr[j];
                tempBlue.push(j);
                drawChart(arr, -1, -1, correctedIndex, tempBlue);
                await new Promise(resolve => setTimeout(resolve, 1000));
                j = j - 1;
            }
            arr[j + 1] = key;
            drawChart(arr, -1, -1, correctedIndex, []); // Highlight insertion point
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        for (let i = 0; i < arr.length; i++) {
            correctedIndex.push(i);
        }
        drawChart(arr, -1, -1, correctedIndex); // Final draw to reset colors
        setIsSorting(false);
    };

    return (
        <div className="flex flex-col items-center">
            <svg id="chart" className="mt-5"></svg>
            <h1 className='text-2xl font-bold text-gray-800'>Key: {key}</h1>
            <div className='flex gap-8'>
                <button
                    onClick={insertionSort}
                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
            <h1 className='text-l mt-5 font-bold text-gray-800'>Total Comparisions : {comparisions}</h1>
            <h1 className='text-xl mt-3 font-bold text-gray-800'>Sorted: <span className='bg-green-700 w-6 h-4 inline-block'></span></h1>
            <div className='flex flex-col justify-center items-center w-[60vw] mt-5'>
                <h1 className='text-xl font-bold text-gray-800'>Insertion Sort</h1>
                <p className=''>Time Complexity: O(n^2)</p>
                <p className=''>Space Complexity: O(1)</p>
            </div>
        </div>
    );
};

export default InsertionSort;