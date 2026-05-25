import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function SortingBackground() {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const containerRef = useRef(null);

    // Initialize Array
    useEffect(() => {
        resetArray();
    }, []);

    // Sorting Loop
    useEffect(() => {
        if (array.length > 0 && !sorting) {
            bubbleSort();
        }
    }, [array, sorting]);

    const resetArray = () => {
        const count = 50; // Number of bars
        const newArray = Array.from({ length: count }, () => Math.floor(Math.random() * 80) + 10);
        setArray(newArray);
        setSorting(false);
    };

    const bubbleSort = async () => {
        setSorting(true);
        let arr = [...array];
        let n = arr.length;

        // Slowing down the sort for visual effect
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                    await new Promise(r => setTimeout(r, 50)); // Speed of animation
                }
            }
        }

        // Pause then reset
        await new Promise(r => setTimeout(r, 2000));
        resetArray();
    };

    return (
        <div className="flex justify-between items-end h-full w-full gap-[2px] px-8 opacity-50">
            {array.map((value, idx) => (
                <motion.div
                    key={idx}
                    layout // Smooth layout transitions
                    className="flex-1 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-500 rounded-t-sm"
                    style={{
                        height: `${value}%`,
                        opacity: 0.5 + (value / 100) * 0.5
                    }}
                />
            ))}
        </div>
    );
}
