import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const BubbleSort = ({ data }) => {
  // const data = [30, 80, 45, 60, 20, 90, 50, 70];
  const [isSorting, setIsSorting] = React.useState(false);
  const [comparisions, setComparisions] = useState(0);
  const [swaps, setSwaps] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;
    drawChart(data, [], []); // Initial draw
  }, []);

  const drawChart = (arr, highlightIndices = [], correctIndex = []) => {

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
      .attr('x', (d, i) => i * (width / data.length))
      .attr('y', d => height - d)
      .attr('width', width / data.length - 2)
      .attr('height', d => d)
      .attr('fill', (d, i) => highlightIndices.includes(i) ? 'red' : correctIndex.includes(i) ? 'green' : 'teal');

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

  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true); // Prevent multiple clicks
    if (!data || data.length === 0) return;
    let arr = [...data];
    let flag = true;
    const correctIndex = [];
    for (let i = 0; i < arr.length && flag; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        drawChart(arr, [j, j + 1], correctIndex); // Highlight the bars being compared
        await new Promise(resolve => setTimeout(resolve, 500)); // Pause for visualization
        setComparisions(prev => prev + 1);
        if (arr[j] > arr[j + 1]) {
          setSwaps(prev => prev + 1);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          drawChart(arr, [j, j + 1], correctIndex); // Highlight the bars being swapped
          await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization
        }
      }
      correctIndex.push(arr.length - i - 1); // Mark the last sorted element
    }
    correctIndex.push(0); // Mark the first sorted element
    drawChart(arr, [], correctIndex); // Final draw to reset colors
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center">
      <svg id="chart" className="mt-5"></svg>
      <div className='flex gap-8'>
        <button
          onClick={bubbleSort}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
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
      <div className='flex mt-5 flex-col w-[60vw]'>
        <div className='flex gap-5 justify-between'>
          <h1 className='text-l font-bold text-gray-800'>Total Comparisions : {comparisions}</h1>
          <h1 className='text-l font-bold text-gray-800'>Total Swaps : {swaps}</h1>
        </div>
      </div>
      <h1 className='text-xl mt-3 font-bold text-gray-800'>Sorted: <span className='bg-green-700 w-6 h-4 inline-block'></span></h1>
      <div className='flex flex-col justify-center items-center w-[60vw] mt-5'>
        <h1 className='text-xl font-bold text-gray-800'>Bubble Sort</h1>
        <p className=''>Time Complexity: O(n^2)</p>
        <p className=''>Space Complexity: O(1)</p>
      </div>
    </div>
  );
};

export default BubbleSort;

