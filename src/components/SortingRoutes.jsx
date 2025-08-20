import { useEffect, useState } from 'react';
import '../App.css';
import SortOptionContainer from './SortOptionContainer';
import useGenerateRandomData from '../customHooks/useGenerateRandomData';
import { Route, Routes } from 'react-router-dom';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import QuickSort from './QuickSort';
import MergeSort from './MergeSort';
import HeapSort from './HeapSort';
import { useNavigate } from 'react-router-dom';

function App() {
  const [sizeOfArray, setSizeOfArray] = useState(20);
  const [data, setData] = useState(useGenerateRandomData(sizeOfArray || 20));
  const [sortingMethod, setSortingMethod] = useState(localStorage.getItem('sortingMethod') || 'quickSort');
  const navigate = useNavigate();

  useEffect(() => {
    setData(useGenerateRandomData(sizeOfArray || 20));
  }, [sizeOfArray]);

  useEffect(() => {
    if (sortingMethod === 'bubbleSort') {
      navigate('/bubbleSort');
    } else if (sortingMethod === 'selectionSort') {
      navigate('/selectionSort');
    } else if (sortingMethod === 'insertionSort') {
      navigate('/insertionSort');
    } else if (sortingMethod === 'mergeSort') {
      navigate('/mergeSort');
    } else if (sortingMethod === 'quickSort') {
      navigate('/quickSort');
    } else if (sortingMethod === 'heapSort') {
      navigate('/heapSort');
    }
  }, [sortingMethod, navigate]);
  return (
    <>
      <SortOptionContainer sizeOfArray={sizeOfArray} setSizeOfArray={setSizeOfArray} setSortingMethod={setSortingMethod} sortingMethod={sortingMethod} />
      <Routes>
        <Route path='/quickSort' element={<QuickSort data={data} />} />
        <Route path='/bubbleSort' element={<BubbleSort data={data} />} />
        <Route path='/selectionSort' element={<SelectionSort data={data} />} />
        <Route path='/insertionSort' element={<InsertionSort data={data} />} />
        <Route path='/mergeSort' element={<MergeSort data={data} />} />
        <Route path='/heapSort' element={<HeapSort data={data} />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      {/* <DisplaySortingMethod sortingMethod={sortingMethod} data={data} /> */}
    </>

  )
}

export default App
