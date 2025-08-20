import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { compile } from 'tailwindcss';

const BinarySearch = ({ data }) => {

    const [target, setTarget] = useState(70);
    const [message, setMessage] = useState('');
    const [lowElement, setLowElement] = useState(0);
    const [midElement, setMidElement] = useState(0);
    const [highElement, setHighElement] = useState(0);
    const [Comparisions, setComparisions] = useState(0);

    useEffect(() => {
        data.sort((a, b) => a - b);
        drawChart(data);
    }, [data]);

    const drawChart = (arr, highlightIndices = {}) => {
        const width = 800;
        const height = 100;
        const svg = d3.select('#chart')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('*').remove(); // Clear previous drawings

        const xScale = d3.scaleBand()
            .domain(data.map((_, i) => i))
            .range([0, width])
            .padding(0.1);

        svg.selectAll('rect')
            .data(arr)
            .enter()
            .append('rect')
            .attr('x', (d, i) => xScale(i))
            .attr('y', 20)
            .attr('width', xScale.bandwidth())
            .attr('height', 30)
            .attr('fill', (d, i) => {
                if (i === highlightIndices.left) return 'blue';
                if (i === highlightIndices.mid) return 'yellow';
                if (i === highlightIndices.right) return 'red';
                return 'teal';
            });

        svg.selectAll('text')
            .data(arr)
            .enter()
            .append('text')
            .text(d => d)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white');
    };

    const binarySearch = async () => {
        const arr = [...data];
        // arr.sort((a, b) => a - b);
        let left = 0;
        let right = data.length - 1;
        let found = false;

        while (left <= right) {
            setComparisions(prev => prev + 1);
            const mid = Math.floor((left + right) / 2);
            drawChart(arr, { left, mid, right });
            setLowElement(arr[left]);
            setMidElement(arr[mid]);
            setHighElement(arr[right]);
            setMessage(`Searching for ${target}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (arr[mid] === target) {
                setMessage(`Found ${target} at index ${mid}`);
                found = true;
                break;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (!found) {
            setMessage(`${target} not found in the array.`);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <svg id="chart" className="mt-5"></svg>

            <div className='flex gap-5 justify-between'>
                <h1 className='text-l font-bold text-gray-800'>Low <span className='bg-blue-700 w-5 h-3 inline-block'></span> : {lowElement}</h1>
                <h1 className='text-l font-bold text-gray-800'>Mid <span className='bg-yellow-300 w-5 h-3 inline-block'></span> : {midElement}</h1>
                <h1 className='text-l font-bold text-gray-800'>High <span className='bg-orange-600 w-5 h-3 inline-block'></span> : {highElement}</h1>
            </div>
            <div className='flex gap-5 justify-between'>
                <h1 className='text-l font-bold text-gray-800 mt-5'>Target : {target}</h1>
                <h1 className='text-l font-bold text-gray-800 mt-5'>Comparisions : {Comparisions}</h1>
            </div>
            <h2 className="text-2xl font-bold mt-5">Binary Search Visualization</h2>
            <button
                onClick={binarySearch}
                className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Start Binary Search
            </button>
            <button
                onClick={() => window.location.reload()}
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
            >
                Reset
            </button>

            <div className="mt-3">
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="border p-1"
                    placeholder="Enter target value"
                />
            </div>
            <p className="mt-3 text-lg font-bold">{message}</p>
        </div>
    );
};

export default BinarySearch;