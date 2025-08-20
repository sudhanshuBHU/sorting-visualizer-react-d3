import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const QuickSort = ({ data }) => {

    let correctIndex = [];
    const [p, setP] = useState(0);
    const [curElement, setCurElement] = useState(0);
    const [comparisions, setComparisions] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        drawChart(data);
    }, [data]);

    const drawChart = (arr, orange = -1, red = -1, highlightIndices = []) => {

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
            .attr('fill', (_, i) => orange == i ? 'yellow' : red == i ? 'red' : highlightIndices.includes(i) ? 'blue' : correctIndex.includes(i) ? 'green' : 'teal');

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


    async function partition(arr, low, high) {
        let pivot = arr[high];
        setP(pivot);
        let i = (low - 1);
        let tempBlue = [];
        drawChart(arr, high, low); // Highlight pivot, current element, and partition index
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let j = low; j <= high - 1; j++) {
            let comp = j;
            drawChart(arr, high, comp, tempBlue); // Highlight current element
            await new Promise(resolve => setTimeout(resolve, 500));
            // tempBlue.push(j);
            setCurElement(arr[j]);
            setComparisions(prev => prev + 1);
            if (arr[j] < pivot) {
                setSwaps(prev => prev + 1);
                i++;
                tempBlue.push(i);
                [arr[i], arr[j]] = [arr[j], arr[i]];
                drawChart(arr, high, -1, tempBlue); // Highlight swap
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                // let cur = tempBlue.pop();
                drawChart(arr, high, j, tempBlue); // Highlight current element
                // tempBlue.push(cur);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        drawChart(arr, high, -1); // Highlight final pivot swap
        await new Promise(resolve => setTimeout(resolve, 500));
        return (i + 1);
    }

    async function quickSort(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            correctIndex.push(pi);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }

    const startQuickSort = async () => {
        if (isSorting) return;
        setIsSorting(true); 
        let arr = [...data];
        await quickSort(arr, 0, arr.length - 1);
        correctIndex = arr.map((_, index) => index);
        drawChart(arr, -1, -1,[]);
        setIsSorting(false);
    };

    return (
        <div className="flex flex-col items-center">
            <svg id="chart" className="mt-5"></svg>
            <div className='flex gap-8'>
                <button
                    onClick={startQuickSort}
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
            <div className='flex flex-col w-[60vw]'>
                <div className='flex gap-5 justify-between'>
                    <h1 className='text-l font-bold text-gray-800'>Current Element <span className='bg-red-700 w-5 h-3 inline-block'></span> : {curElement}</h1>
                    <h1 className='text-l font-bold text-gray-800'>Pivot <span className='bg-yellow-300 w-5 h-3 inline-block'></span> : {p}</h1>
                </div>
                <div className='flex gap-5 justify-between'>
                    <h1 className='text-l font-bold text-gray-800'>Total Comparisions : {comparisions}</h1>
                    <h1 className='text-l font-bold text-gray-800'>Total Swaps : {swaps}</h1>
                </div>
            </div>
                <h1 className='text-xl font-bold text-gray-800'>Sorted: <span className='bg-green-700 w-6 h-4 inline-block'></span></h1>
            <div className='flex flex-col justify-center items-center w-[60vw] mt-5'>
                <h1 className='text-xl font-bold text-gray-800'>Quick Sort</h1>
                <p className=''>Time Complexity: O(n log n)</p>
                <p className=''>Space Complexity: O(log n)</p>
            </div>
        </div>
    );
}

export default QuickSort;