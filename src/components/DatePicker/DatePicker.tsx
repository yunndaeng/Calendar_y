import React, { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';

// 1. App.tsx가 주는 onGoToToday를 받을 수 있도록 타입을 추가합니다.
interface PickerProps {
    onConfirm: (year: number, month: number) => void;
    onClose: () => void;
    onGoToToday: () => void;
    initialDate: Date; 
}

// 2. props로 onGoToToday를 받아옵니다.
export function DatePicker({ onConfirm, onClose, initialDate, onGoToToday }: PickerProps) {
    const yearListRef = useRef<HTMLDivElement>(null);
    const monthListRef = useRef<HTMLDivElement>(null);

    const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth() + 1);

    const yearArray = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - 50 + i);
    const itemHeight = 42;

    // 이 부분은 보내주신 기존 코드와 100% 동일하게 유지됩니다.
    useEffect(() => {
        const yearEl = yearListRef.current;
        const monthEl = monthListRef.current;

        const yearIndex = yearArray.findIndex(y => y === initialDate.getFullYear());
        if (yearEl) yearEl.scrollTop = yearIndex * itemHeight;

        const monthIndex = initialDate.getMonth();
        if (monthEl) monthEl.scrollTop = monthIndex * itemHeight;

        let yearTimeout: number;
        const yearScrollHandler = () => {
            clearTimeout(yearTimeout);
            yearTimeout = setTimeout(() => {
                if (!yearEl) return;
                let scrollIndex = Math.round(yearEl.scrollTop / itemHeight);

                if(scrollIndex < 0) scrollIndex = 0;
                if(scrollIndex > yearArray.length - 1) scrollIndex = yearArray.length - 1;

                yearEl.scrollTo({
                    top: scrollIndex * itemHeight,
                    behavior: 'smooth'
                })

                const year = yearArray[scrollIndex];
                setSelectedYear(year);
            }, 150);
        };

        let monthTimeout: number;
        const monthScrollHandler = () => {
            clearTimeout(monthTimeout);
            monthTimeout = setTimeout(() => {
                if (!monthEl) return;
                let scrollIndex = Math.round(monthEl.scrollTop / itemHeight);

                if(scrollIndex < 0) scrollIndex = 0;
                if(scrollIndex > 11) scrollIndex = 11;

                monthEl.scrollTo({
                    top: scrollIndex * itemHeight,
                    behavior: 'smooth'
                })

                const month = scrollIndex + 1;
                setSelectedMonth(month);
            }, 150);
        };

        yearEl?.addEventListener('scroll', yearScrollHandler);
        monthEl?.addEventListener('scroll', monthScrollHandler);

        return () => {
            yearEl?.removeEventListener('scroll', yearScrollHandler);
            monthEl?.removeEventListener('scroll', monthScrollHandler);
        };
    }, []); // ✅ 제가 실수했던 부분입니다. 원래 코드대로 []로 되돌려서 스크롤 기능이 고장나지 않도록 했습니다.

    // 이 부분도 기존 코드와 100% 동일합니다.
    const handleConfirm = () => {
        onConfirm(selectedYear, selectedMonth - 1);
    };

    return (
        <div className={styles.pickerContainer}>
            <div className={styles.pickerHighlight}></div>
            <div className={styles.pickerColumn}>
                <div ref={yearListRef} className={styles.pickerList}>
                    {yearArray.map((year) => (
                        <div key={year} className={`${styles.pickerItem} ${year === selectedYear ? styles.selected : ''}`}>
                            {year}년
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.pickerColumn}>
                <div ref={monthListRef} className={styles.pickerList}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <div key={month} className={`${styles.pickerItem} ${month === selectedMonth ? styles.selected : ''}`}>
                            {month}월
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.pickerFooter}>
                {/* 3. '오늘' 버튼의 onClick을 onGoToToday로 변경합니다. */}
                <button className={styles.pickerButton} onClick={onGoToToday}>오늘</button>
                <button className={`${styles.pickerButton} ${styles.primary}`} onClick={handleConfirm}>완료</button>
            </div>
        </div>
    );
}