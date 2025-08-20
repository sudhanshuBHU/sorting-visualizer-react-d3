import { useEffect, useState } from 'react';
import './App.css';
import SortOptionContainer from './components/SortOptionContainer';
import useGenerateRandomData from './customHooks/useGenerateRandomData';
import DisplaySortingMethod from './components/DisplaySortingMethod';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BubbleSort from './components/BubbleSort';
import SelectionSort from './components/SelectionSort';
import InsertionSort from './components/InsertionSort';
import QuickSort from './components/QuickSort';
import MergeSort from './components/MergeSort';
import HeapSort from './components/HeapSort';
import { useNavigate } from 'react-router-dom';
import ChoiceSelection from './components/ChoiceSelection';
import BinarySearch from './components/BinarySearch';

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
    }else if(sortingMethod === 'binarySearch') {
      navigate('/binarySearch');
    }
  }, [sortingMethod]);
  return (
    <>
      <SortOptionContainer sizeOfArray={sizeOfArray} setSizeOfArray={setSizeOfArray} setSortingMethod={setSortingMethod} sortingMethod={sortingMethod} />
      <Routes>
        <Route path='/' element={<ChoiceSelection />} />
        <Route path='/quickSort' element={<QuickSort data={data} />} />
        <Route path='/bubbleSort' element={<BubbleSort data={data} />} />
        <Route path='/selectionSort' element={<SelectionSort data={data} />} />
        <Route path='/insertionSort' element={<InsertionSort data={data} />} />
        <Route path='/mergeSort' element={<MergeSort data={data} />} />
        <Route path='/heapSort' element={<HeapSort data={data} />} />
        <Route path='/binarySearch' element={<BinarySearch data={data} />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      {/* <DisplaySortingMethod sortingMethod={sortingMethod} data={data} /> */}
    </>

  )
}

export default App
