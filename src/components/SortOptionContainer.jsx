import React, { useEffect, useRef } from 'react'

const SortOptionContainer = ({ sizeOfArray, setSizeOfArray, setSortingMethod, sortingMethod }) => {
    const slider = useRef(null);
    const select = useRef(null);

    useEffect(() => {
        localStorage.setItem('sizeOfArray', sizeOfArray);
        localStorage.setItem('sortingMethod', sortingMethod);
    }, [sortingMethod, sizeOfArray]);

    const handleSliderChange = (e) => {
        const value = e.target.value;
        slider.current.value = value;
        setSizeOfArray(value);
    }
    const handleSelectChange = (e) => {
        const value = e.target.value;
        select.current.value = value;
        setSortingMethod(value);
    }
    return (
        <div className='flex flex-col items-center mt-5 space-y-4'>
            <h1 className='text-2xl font-bold text-gray-800'>Sorting / Searching Algorithms</h1>
            <div className='flex items-center space-x-3'>
                <input type="range" className='w-40 accent-blue-500' min={3} max={100} ref={slider} onChange={handleSliderChange} value={sizeOfArray} />
                <label className='text-gray-600'>{sizeOfArray || 20}</label>
                <select className='ml-8 border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' ref={select} onChange={handleSelectChange} value={sortingMethod}>
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                    <option value="heapSort">Heap Sort</option>
                    <option value="binarySearch">Binary Search</option>
                </select>
            </div>
        </div>
    )
}

export default SortOptionContainer;