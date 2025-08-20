function useGenerateRandomData(size, min = 2, max = 200) {
    if (size <= 0 || min > max) {
        throw new Error("Invalid input parameters");
    }

    const randomData = [];
    for (let i = 0; i < size; i++) {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        randomData.push(randomValue);
    }

    return randomData;
}

export default useGenerateRandomData;