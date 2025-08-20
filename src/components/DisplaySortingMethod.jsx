import React from 'react';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import HeapSort from './HeapSort';

const DisplaySortingMethod = ({sortingMethod, data}) => {
  return (
    <div>
        {
            sortingMethod === 'bubbleSort' ? <BubbleSort data={data} /> :
            sortingMethod === 'selectionSort' ? <SelectionSort data={data} /> :
            sortingMethod === 'insertionSort' ? <InsertionSort data={data} /> :
            sortingMethod === 'mergeSort' ? <MergeSort  data={data} /> :
            sortingMethod === 'quickSort' ? <QuickSort data={data} /> :
            sortingMethod === 'heapSort' ? <HeapSort data={data} /> :
            <h1 className='text-2xl font-bold text-gray-800'>Sorting Method Not Found</h1>
        }
    </div>
  )
}

export default DisplaySortingMethod;